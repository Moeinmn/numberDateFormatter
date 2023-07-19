const fs = require("fs");
const path = require("path");

let pacakgeJson = JSON.parse(fs.readFileSync("package.json"));

let currentVersion = pacakgeJson.version;
let splitedVresion = currentVersion.split(".");

splitedVresion[2] = `${+splitedVresion[2] + 1}`;

let newVersion = splitedVresion.join(".");

pacakgeJson.version = newVersion;

fs.writeFileSync("package.json", JSON.stringify(pacakgeJson));

console.log("NPM package updated!!");
