declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PdfParseResult {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
    text: string;
  }

  export default function pdfParse(
    dataBuffer: Buffer | Uint8Array,
    options?: any
  ): Promise<PdfParseResult>;
}
