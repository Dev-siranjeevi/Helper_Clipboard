const {
  ipcRenderer,
  clipboard
} = require("electron");
import {
  intialCoord
} from "./coordinate.js"
import {
  pinClip,
  pinValidation
} from "./Clipboard/pinClip.js"
import {
  createView
} from "./Clipboard/createView.js"

// Assign
// const getDataBtn = document.getElementById("get");
const coordinate = document.getElementById("coordinate");
const clearAllData = document.getElementById("clearAll");
const pinbtn = document.querySelectorAll(".pin");
// const footer = document.getElementById("footer");
// const act = document.getElementById("act");
let coordinateIndicator = false;
// test Only
let testArr = [{
  value: "clip",
  time: new Date().toLocaleDateString(),
  pinned: false
}, {
  value: "clip2",
  pinned: false
}, {
  value: "clip3",
  pinned: false
}]

export let clipList = []; //Set an empty array

// Check and update the status of coordinate module.
coordinate.addEventListener("change", (event) => {
  coordinateIndicator = event.srcElement.checked;
  
});

export const copyToClipboard = () => {
  let clip = clipboard.readText() //Get the clipboard text\

  const secondLetter = clip.substring(1, 2)
  if (coordinateIndicator && clip !== "" && !isNaN(secondLetter)) {
    clip = intialCoord(coordinateIndicator, clip)
    clipboard.writeText(clip);
  }
  if (clip !== "") {
    let copiedValue = {
      value: clip,
      time: new Date().toLocaleTimeString(), //new Date().toLocaleDateString() +
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
      createView(clipList);
    }
  }
}
window.addEventListener("load", (event) => {
  document.querySelector(".clips").addEventListener("click", (e) => {
    let clicked = e.path[1].id;
    console.log(clicked);

    if (clicked !== "") {
      if (clicked.includes("copy")) {
        copyElement(clipList, clicked);
      } else if (clicked.includes("pin")) {
        pinElement(clipList, clicked);
        createView(clipList);
      } else if (clicked.includes("del")) {
        delElement(clipList, clicked);
        createView(clipList);
      }

    } else {
      console.log("Nothing has been clicked");
    }

  })
});
// Pin event of clipboard
// clear clipboard
clearAllData.addEventListener("click", (a) => {
  clearClipboard(a)
  // Update the UI
  clipList.push({
    value: "A example of clip element",
    time: new Date().toLocaleTimeString(), //new Date().toLocaleDateString() +
    pinned: false
  })
  createView(clipList);
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
    clipboard.writeText(revereseClip[0].value); //Nothing is copied
  } else {
    clipList = [];
    clipboard.writeText(""); //Nothing is copied
  }
}

function pinElement(list, element) {
  const postion = element.replace("pin", "");
  let prior = pinValidation(list).slice().reverse();
  let pinStatus = prior[postion].pinned;
  prior[postion].pinned = !pinStatus;
  console.log(prior);

  const clickedOn = document.getElementById(element);
  clickedOn.className.baseVal.includes("pinactive") ? clickedOn.classList.remove("pinactive") : clickedOn.classList.add("pinactive");

}

function delElement(list, element) {
  const postion = element.replace("del", "");
  let prior = pinValidation(list).slice().reverse();

  const clipDel = prior[postion].value;

  const newPrior = prior.filter((clip) => {
    return clip.value != clipDel
  })

  clipList = pinValidation(newPrior).slice().reverse();
  clipboard.writeText("");
}

function copyElement(list, element) {
  const postion = element.replace("copy", "");
  let prior = list.slice().reverse();

  const clipDel = prior[postion].value;
  clipboard.writeText(clipDel);

  let copiedText = document.querySelector(`#${element}`);
  copiedText.classList.add("copy-el");
  setTimeout(()=>{
    copiedText.classList.remove("copy-el");
  }, 2000);
}
