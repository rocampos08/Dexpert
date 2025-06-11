import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  const fullPrompt = `
Act as a product development expert for startups.
Based on the following user prompt:

"${prompt}"

Return ONLY a JSON object without any explanation or extra text, using these keys:
- title: a brief project title
- description: a clear description of the project
- skills: a list of required skills (as a comma-separated string)

Example output:
{
  "title": "Transcription Service for Podcasts",
  "description": "Offer transcription services to podcast creators, turning audio episodes into accurate text for blogs or accessibility.",
  "skills": "Typing, Attention to detail, Grammar, Audio editing basics"
}
`

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: fullPrompt }],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('LLaMA error:', error)
      return NextResponse.json({ error: 'LLaMA API error' }, { status: 500 })
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content

    const match = content.match(/\{[\s\S]*?\}/)
    if (!match) {
      console.error('No JSON found in response:', content)
      return NextResponse.json({ error: 'Could not extract a valid idea' }, { status: 500 })
    }

    let parsed
    try {
      parsed = JSON.parse(match[0])
    } catch (e) {
      console.error('Error parsing extracted JSON:', match[0])
      return NextResponse.json({ error: 'Generated JSON is malformed' }, { status: 500 })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('General server error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
