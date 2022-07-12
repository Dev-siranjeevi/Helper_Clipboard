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
  let indexofclip = a.srcElement.id.replace("clipitem","");
  // console.log(indexofclip);
  let prior = clipList.slice().reverse();
  let writeToClip = prior[Number(indexofclip)].value;
  if (tags === "p") {
    console.log(writeToClip);
    clipboard.writeText(writeToClip);
    // console.log(clipList);
    clickedOn.classList.add("copied");
    setTimeout(()=>{
          clickedOn.classList.remove("copied");
    }, 1500);
  }
}
