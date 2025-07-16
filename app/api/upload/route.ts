export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid or missing file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const { text } = await pdfParse(Buffer.from(bytes));

    return NextResponse.json({ content: text });
  } catch (err) {
    console.error('PDF parse error:', err);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}