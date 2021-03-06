const {
  ipcRenderer,
  clipboard
} = require("electron");
import {
  intialCoord
} from "./coordinate.js"
import {
  pinClip
} from "./Clipboard/pinClip.js"
import {
  createView
} from "./Clipboard/createView.js"
// Assign
const getDataBtn = document.getElementById("get");
const coordinate = document.getElementById("coordinate");
const clearAllData = document.getElementById("clear");
const footer = document.getElementById("footer");
const act = document.getElementById("act");
// const clvl = document.getElementById("clvl");
let coordinateIndicator = false;
export let clipList = []; //Set an empty array
// Check and update the status of coordinate module.
coordinate.addEventListener("click", (event) => {
  coordinateIndicator = event.srcElement.checked;
});

export const copyToClipboard = () => {
  let clip = clipboard.readText() //Get the clipboard text\
  const secondLetter = clip.substring(1, 2)
  // console.log(secondLetter);
  if (coordinateIndicator && clip !== "" && !isNaN(secondLetter)) {
    clip = intialCoord(coordinateIndicator, clip)
    clipboard.writeText(clip);
  }
  if (clip !== "") {
    let copiedValue = {
      value: clip,
      pinned: false
    }
    let clipAvbl = false;
    clipList.forEach((val) => {

      if (val.value == clip) {
        clipAvbl = true
      }
    })
    if (clipAvbl === false) { //Check if the element exist in the array
      clipList.push(copiedValue) //if not then
      createView();
      // console.log(clipList);
    }
  }
}
// Pin event of clipboard
document.addEventListener("contextmenu", (a) => {
  pinClip(a)
});
// clear clipboard
clearAllData.addEventListener("click", (a) => {
  clearClipboard(a)
  // Update the UI
  createView();
});

function clearClipboard(eventvalue) {
  // loop through the list to filter out the pinned elements
  let pinnedClip = clipList.filter((item) => {
    return item.pinned;
  })
  // Create the new cliplist
  if (pinnedClip.length > 0) {
    clipList = [...pinnedClip];
    let revereseClip = [...clipList];
    revereseClip.reverse();
    console.log(clipList);
    console.log(revereseClip);
    // console.log();
    clipboard.writeText(revereseClip[0].value); //Nothing is copied
  }

  // console.log(clipList);
}
