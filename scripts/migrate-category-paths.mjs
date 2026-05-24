import fs from "fs";
import path from "path";

const pathReps = [
  ["/work/philosophy/", "/work/reflections/"],
  ["/work/crypto/", "/work/photography/"],
  ["/work/metalworking/", "/work/physical-objects/"],
  ["/work/woodworking/", "/work/physical-objects/"],
  ["/work/pc-networks/", "/work/plotter/"],
  ["/work/film/", "/work/physical-objects/"],
];

const exactReps = [
  ["/work/crypto", "/work/photography"],
  ["/work/philosophy", "/work/reflections"],
  ["/work/nursery", "/work/physical-objects"],
];

const breadcrumbReps = {
  metalworking: "physical-objects",
  woodworking: "physical-objects",
  philosophy: "reflections",
  crypto: "photography",
  "pc-networks": "plotter",
  film: "physical-objects",
  nursery: "physical-objects",
};

function apply(text) {
  let out = text;
  for (const [a, b] of pathReps) out = out.split(a).join(b);
  for (const [a, b] of exactReps) {
    out = out.replaceAll(a, b);
  }
  for (const [oldCat, newCat] of Object.entries(breadcrumbReps)) {
    out = out.replaceAll(`category: "${oldCat}"`, `category: "${newCat}"`);
    out = out.replaceAll(`category: '${oldCat}'`, `category: '${newCat}'`);
  }
  return out;
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".git") continue;
      walk(p);
    } else if (/\.(js|jsx)$/.test(ent.name)) {
      const text = fs.readFileSync(p, "utf8");
      const out = apply(text);
      if (out !== text) {
        fs.writeFileSync(p, out);
        console.log("updated", p);
      }
    }
  }
}

walk("content");
