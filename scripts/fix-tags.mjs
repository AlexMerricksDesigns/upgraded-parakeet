import fs from "fs";
const file = process.argv[2];
let c = fs.readFileSync(file, "utf8");
const wrong = "motion";
const right = "div";
c = c.replaceAll(`</${wrong}>`, `</${right}>`);
c = c.replaceAll(`<${wrong}`, `<${right}`);
fs.writeFileSync(file, c);
