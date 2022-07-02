import { kerdoc, getSize } from '../dist/index.js';

kerdoc("./out/test2.pdf", getSize(`A6`), (ctx, index) => {
    if (index > 10) { ctx.finish(); return; }
    ctx.apply(`<h1>${index}</h1>`);
});
