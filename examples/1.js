// @ts-check

import { doc, kerdoc, getSize, page } from '../dist/index.js';

let pages = " ".repeat(5).split("").map((_, i) => `<h1>${i}</h1>`).map((v, i) => page(v));

kerdoc(
    doc(getSize("A4"),
        pages,
        { border: "10px", padding: "100px" }
    ),
    "./out/test2.pdf"
);
