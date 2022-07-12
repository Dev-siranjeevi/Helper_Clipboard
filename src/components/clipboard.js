const {
  ipcRenderer,
  clipboard
} = require("electron");
import {
  cal,
  intialCoord
} from "./coordinate.js"
import {pinClip} from "./pinClip.js"
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


// function checkerA(ar)
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
  prior.forEach((clip,index)=>{
      let className = clip.pinned ==true?"clipboard pinned": "clipboard";
      let clipId = "clipitem" + index;
      // Create a paragraph element
      let clipview = document.createElement("p");
      clipview.id = clipId;
      clipview.className =className;
      clipview.innerHTML = clip.value;
      // Appended it it to root/.
      root.appendChild(clipview);
      document.getElementById("mainBody").appendChild(root);
  })
}
function creatUI(clip,index){

}
// Pin event of clipboard
document.addEventListener("contextmenu", (a)=>{
  pinClip(a)

});
// clear clipboard
clearAllData.addEventListener("click", (a)=>{
  clearClipboard(a)
  // Update the UI
  createView();
});

function clearClipboard(eventvalue){
  clipboard.writeText("");//Nothing is copied
  // loop through the list to filter out the pinned elements
  let pinnedClip = clipList.filter((item) => {
    return item.pinned;
  })
  // Create the new cliplist
  clipList = [...pinnedClip]
  // console.log(clipList);

}
