// import { writeFile } from "fs";
// import { genPDF } from "./index.js";
// import { getSize } from "./size.js";
// import { genHtml } from './genhtml.js';

// (async () => {
//   let buf = await genPDF(
//     genHtml(`<h1>Hello World</h1><button>Click me</button>`),
//     getSize("A4")
//   );
//   writeFile("./out/test.pdf", buf, (err) => {
//     console.error(err);
//   });
// })();

export {};


import(process.argv[2]);
