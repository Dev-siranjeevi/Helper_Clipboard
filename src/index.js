const {
  ipcRenderer,
  clipboard
} = require("electron");

import {
  copyToClipboard,
  clipList
} from "./components/clipboard.js"

setInterval(() => {
  copyToClipboard();
}, 800); //Run it ever 500 ms

const pinApplication = document.querySelector('#move');
pinApplication.addEventListener("click", () => {
  ipcRenderer.send("Update-Application-position", "Toogle Applications mobility");
  // Set styling
  pinApplication.className.baseVal.includes("pinactive") ? pinApplication.classList.remove("pinactive") : pinApplication.classList.add("pinactive");
})

const alwaysOntop = document.querySelector('#layer');
alwaysOntop.addEventListener("click", () => {
  ipcRenderer.send("Update-Application-layer", "Toogle Applications mobility");
  // Set styling
  alwaysOntop.className.baseVal.includes("pinactive") ? alwaysOntop.classList.remove("pinactive") : alwaysOntop.classList.add("pinactive");
})
