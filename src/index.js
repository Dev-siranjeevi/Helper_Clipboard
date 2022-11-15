const {
  ipcRenderer,
  clipboard
} = require("electron");

import {
  copyToClipboard,
  clipList
} from "./components/clipboard.js"
import {
  pinValidation
} from "./components/Clipboard/pinClip.js"
setInterval(copyToClipboard, 500); //Run it ever 500 ms

// copy element
document.addEventListener("click", (a) => {
  action(a, "Copied")
})

function action(a, attr) {
  const clickedOn = a.srcElement;
  let tags = a.target.localName;
  let indexofclip = a.srcElement.id.replace("clipitem", "");
  // console.log(indexofclip);
  let writeToClip;

  if (tags === "p") {

    if (clipList.length > 0) {
      let prior = pinValidation(clipList).slice().reverse();
      writeToClip = prior[Number(indexofclip)].value;
    }

    console.log(writeToClip);
    clipboard.writeText(writeToClip);
    // console.log(clipList);
    clickedOn.classList.add("copied");
    clickedOn.classList.remove("hov");
    setTimeout(() => {
      clickedOn.classList.remove("copied");
      clickedOn.classList.add("hov");
    }, 1500);
  }
}

// const coordmodule = document.querySelector(".switch-inp");
//
// coordmodule.addEventListener("change",()=>{
//   // Activate the coordinate module.
//
// })
