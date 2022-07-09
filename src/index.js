const {
  ipcRenderer,
  clipboard
} = require("electron");

import {
  copyToClipboard,
  clipList
} from "./components/clipboard.js"
setInterval(copyToClipboard, 500); //Run it ever 500 ms

// copy element
document.addEventListener("click", (a) => {
  action(a, "Copied")

})

function action(a, attr) {
  const clickedOn = a.srcElement;
  let tags = a.target.localName;

  let writeToClip = clickedOn.innerText;
  console.log(writeToClip);
  if (tags === "p") {
    clipboard.writeText(writeToClip);
    console.log(clipList);
  }
}
