const {
  ipcRenderer,
  clipboard
} = require("electron");

import{copyToClipboard}from "./components/clipboard.js"
setInterval(copyToClipboard, 500); //Run it ever 500 ms



// copy element
document.addEventListener("click", (a) => {
  const clickedOn = a.srcElement;
  let tags = a.target.localName;

  let writeToClip = clickedOn.innerHTML;
  if (tags === "p") {
    clipboard.writeText(writeToClip);
    clipList.splice(clipList.indexOf(writeToClip), 1, writeToClip)
  }

})
