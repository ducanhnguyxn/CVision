export interface AISection {
  title: string;
  score: number; // 0-100
  feedback: string[];
  suggestions: string[];
}

export interface AIAnalysis {
  overallScore: number; // 0-100
  sections: AISection[];
}

function buildPrompt(cvText: string) {
  const truncated = cvText.slice(0, 12000);
  return [
    {
      role: "system",
      content:
        "You are an expert CV reviewer. Return STRICT JSON only, matching the provided schema. No extra text.",
    },
    {
      role: "user",
      content:
        `Analyze the following CV text and return JSON with this exact TypeScript shape:\n\n{
  overallScore: number, // 0-100
  sections: Array<{
    title: string,
    score: number, // 0-100
    feedback: string[],
    suggestions: string[]
  }>
}\n\nCV:\n${truncated}`,
    },
  ];
}

function extractJSON(text: string): any {
  // Try to find a JSON block in the response
  const jsonMatch = text.match(/\{[\s\S]*\}$/);
  const candidate = jsonMatch ? jsonMatch[0] : text;
  return JSON.parse(candidate);
}

export async function analyzeCv(params: {
  cvText: string;
}): Promise<AIAnalysis> {
  const { cvText } = params;

  const res = await fetch("https://ayllqlaiioulhwbbdvhl.supabase.co/functions/v1/analyze-cv", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cvText,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`AI request failed: ${res.status} ${errText}`);
  }

  const parsed = await res.json();

  // Basic validation
  if (
    typeof parsed?.overallScore !== "number" ||
    !Array.isArray(parsed?.sections)
  ) {
    throw new Error("Invalid AI response format");
  }

  return parsed as AIAnalysis;
}
