import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, fileContent } = body;
    const combinedPrompt = `${prompt}\n\nFile content:\n${fileContent}`;

    console.log(combinedPrompt);

    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',   // use your actual model name here
        prompt: combinedPrompt,
        stream: false
      }),
    });

    const data = await res.json();
    return NextResponse.json({ response: data.response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
