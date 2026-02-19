import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const models = [
      "openai/gpt-4.1",
      "openai/gpt-4o",
      "anthropic/claude-3.5-sonnet",
      "google/gemini-1.5-pro",
      "meta-llama/llama-3.1-405b",
      "mistral/mistral-large",
      "deepseek/deepseek-chat"
    ];

    const results = [];

    for (const model of models) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await response.json();

      results.push({
        model,
        output: data?.choices?.[0]?.message?.content || "No output"
      });
    }

    // BEST ANSWER COMBINED
    const combined = results.map(r => r.output).join("\n\n ---- \n\n");

    return NextResponse.json({
      success: true,
      results,
      best_answer: combined
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
