const { ipcRenderer } = require("electron");

import { copyToClipboard } from "./components/clipboard.js";

const timeInterval = 500;
setInterval(() => {
  copyToClipboard();
}, timeInterval); //Run it ever 500 ms

const pinApplication = document.querySelector("#move");
let positionStatus = "float";
pinApplication.addEventListener("click", () => {
  ipcRenderer.send("Update-Application-position", positionStatus);
  // Set styling
  pinApplication.className.baseVal.includes("pinactive")
    ? pinApplication.classList.remove("pinactive")
    : pinApplication.classList.add("pinactive");
});

const alwaysOntop = document.querySelector("#layer");
alwaysOntop.addEventListener("click", () => {
  ipcRenderer.send("Update-Application-layer", "Toogle Applications mobility");
  // Set styling
  alwaysOntop.className.baseVal.includes("pinactive")
    ? alwaysOntop.classList.remove("pinactive")
    : alwaysOntop.classList.add("pinactive");
});

window.addEventListener("load", () => {
  const footer = document.getElementById("act");
  const activeVersion = "V4.1.2";
  footer.innerHTML = activeVersion;
});
