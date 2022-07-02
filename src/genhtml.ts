export function genHtml(raw: string): string {
  return `<!DOCTYPE html>
    <html>
        <head>
            <style>
                body {
                    print-color-adjust: exact;
                }
            </style>
        </head>
        <body>
            ${raw}
        </body>
    </html>
    `;
}
