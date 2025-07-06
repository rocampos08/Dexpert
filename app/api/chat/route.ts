import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // O usa "mixtral-8x7b-32768"
        messages,
      }),
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("GROQ API error:", error);
    return NextResponse.json({ error: "Something went wrong with GROQ." }, { status: 500 });
  }
}
