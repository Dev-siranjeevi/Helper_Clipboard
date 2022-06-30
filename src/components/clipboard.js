const {
  ipcRenderer,
  clipboard
} = require("electron");
import {
  cal,
  intialCoord
} from "./coordinate.js"

const getDataBtn = document.getElementById("get");
const clearAllData = document.getElementById("clear");
const coordinate = document.getElementById("coordinate");
let coordinateIndicator = false;
let clipList = []; //Set an empty array


export const copyToClipboard = () => {

  let clip = clipboard.readText() //Get the clipboard text\
  const secondLetter = clip.substring(1,2)
  // console.log(secondLetter);
  if (coordinateIndicator &&clip !== "" && !isNaN(secondLetter)) {
    clip = intialCoord(coordinateIndicator, clip)
    clipboard.writeText(clip);
  }
  if (clip !== "") {
    if (clipList.includes(clip) === false) { //Check if the element exist in the array
      clipList.push(clip) //if not then 
      createView();
    }
  }
}

const createView = () => {

  const prev = document.getElementById("clipList");
  if (prev !== null) {
    prev.remove(); //remove the old div
  }
  // create a new div with same id and loop through the array.clipboard
  let root = document.createElement("div"); // parent
  root.id = "clipList";
  let prior = clipList.slice().reverse();

  // const rclip = clipList.reverse();
  prior.forEach((clip, index) => {
    let clipId = "clipitem" + index;
    // Create a paragraph element
    let clipview = document.createElement("p");
    clipview.id = clipId;
    clipview.className = "clipboard"
    clipview.innerHTML = clip;
    // Appended it it to root/.
    root.appendChild(clipview);
    document.getElementById("mainBody").appendChild(root);
  })
}
coordinate.addEventListener("click", (event) => {
  coordinateIndicator = event.srcElement.checked;
});
clearAllData.addEventListener("click", () => {
  clipList = [];
  clipboard.writeText("");
  createView();
});
