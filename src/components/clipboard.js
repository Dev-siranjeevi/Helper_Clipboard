const { ipcRenderer, clipboard, nativeTheme } = require("electron");
import { intialCoord } from "./Clipboard/coordinate.js";

import { createView } from "./Clipboard/createView.js";

// Assign
// const getDataBtn = document.getElementById("get");
const coordinate = document.getElementById("coordinate");
const clearAllData = document.getElementById("clearAll");
const pinbtn = document.querySelectorAll(".pin");
// const footer = document.getElementById("footer");
// const act = document.getElementById("act");
let coordinateIndicator = false;
// test Only
let testArr = [
  {
    value: "clip",
    time: new Date().toLocaleDateString(),
    pinned: false,

    activeCopy: false,
  },
  {
    value: "clip2",
    time: new Date().toLocaleDateString(),
    pinned: false,

    activeCopy: false,
  },
  {
    value: "clip3",
    time: new Date().toLocaleDateString(),
    pinned: false,

    activeCopy: false,
  },
];
export const defaultSetup = () => {
  if (clipList.length == 0)
    clipList.push({
      value: "A example of clip element",
      time: new Date().toLocaleTimeString(), //new Date().toLocaleDateString() +
      pinned: false,
    });
  createView(clipList);
};
let clipList = []; //Set an empty array
// *******************************************************TOGGLING COORDINATE MODULE***********************************************************************//

// Check and update the status of coordinate module.
coordinate.addEventListener("change", (event) => {
  coordinateIndicator = event.srcElement.checked;
});
// *******************************************************FETCHING DATA FROM CLIP(SYS), VALIDATING AND VISULIZING*****************************************//
const copyToClipboard = async () => {
  let clips = [clipboard.readText()]; //Get the clipboard text\

  const secondLetter = clips[0].substring(1, 2);
  if (coordinateIndicator && clips[0] !== "" && !isNaN(secondLetter)) {
    clips = await intialCoord(coordinateIndicator, clips[0]);
  }
  clips.forEach((clip) => {
    if (
      clip !== "" &&
      clip !=
        "Retrieving data. Wait a few seconds and try to cut or copy again."
    ) {
      clipboard.writeText(clip);
      let copiedValue = {
        value: clip,
        time: new Date().toLocaleTimeString(), //new Date().toLocaleDateString() +
        pinned: false,
        activeCopy: true,
      };
      // If nothing is copied then and contians only template values, we clear the array and start inputting the clipboard data.
      if (
        clipList.length == 1 &&
        clipList[0].value == "A example of clip element"
      ) {
        clipList = [];
      }
      let clipAvbl = false;
      clipList.forEach((val) => {
        if (val.value === clip) {
          clipAvbl = true;
          val.activeCopy = true;
        } else {
          val.activeCopy = false;
        }
      });
      if (clipAvbl === false) {
        //Check if the element exist in the array
        clipList.push(copiedValue); //if not then
        createView(clipList);
      }
    }
  });
  if (clipList.length == 0) {
    defaultSetup();
  }
};
// *******************************************************PRIOTIZE OR PIN SPECIFIC DATA TO TOP OF THE LIST************************************ ******//
function pinClicks(eventReturn) {
  const clickedElementID = eventReturn.path[1].id;

  // Set styling
  const clickedOn = document.getElementById(clickedElementID);
  clickedOn.className.baseVal.includes("pinactive")
    ? clickedOn.classList.remove("pinactive")
    : clickedOn.classList.add("pinactive");
  // Update Pin values
  let prior = clipList.slice().reverse();
  prior.sort((crr, nxt) => {
    return nxt.pinned - crr.pinned;
  });
  const findandUpdate = prior[clickedElementID.replace("pin", "")];
  findandUpdate.pinned = !findandUpdate.pinned;
  clipList = prior.slice().reverse();
  // Refresh view.
  createView(clipList);
}
// *******************************************************COPYING CLICKED DATA***********************************************************************//

function copyClicks(eventReturn) {
  const clickedElementID = eventReturn.path[1].id;
  let copiedText = document.getElementById(
    `copy${clickedElementID.replace("copies", "")}`
  );
  console.log(clickedElementID);
  try {
    copiedText.classList.add("copy-el");
    setTimeout(() => {
      copiedText.classList.remove("copy-el");
    }, 2000);
  } catch {
    console.log("Error while adding Styling");
  }
  let prior = clipList.slice().reverse();
  prior.sort((crr, nxt) => {
    return nxt.pinned - crr.pinned;
  });
  const findandUpdate = prior[clickedElementID.replace("copies", "")];
  // Refresh view.
  clipboard.writeText(findandUpdate.value);
  prior.forEach((item) => {
    item.activeCopy = false;
  });
  findandUpdate.activeCopy = true;
  clipList = prior.slice().reverse();
  // Refresh view.
  createView(clipList);
}
// *******************************************************CLEARING ALL DATA***********************************************************************//
// clear clipboard
clearAllData.addEventListener("click", (a) => {
  clearClipboard(a);
  // Update the UI
  defaultSetup();
});

function clearClipboard(eventvalue) {
  // loop through the list to filter out the pinned elements
  let pinnedClip = clipList.filter((item) => {
    return item.pinned;
  });
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
// *******************************************************CLEARING SPECIFIC DATA***********************************************************************//

function deletClicks(eventReturn) {
  const clickedElementID = eventReturn.path[1].id;
  let prior = clipList.slice().reverse();
  prior.sort((crr, nxt) => {
    return nxt.pinned - crr.pinned;
  });
  const findandUpdate = prior[clickedElementID.replace("del", "")];
  let newCliplist;
  console.log(prior);
  try {
    newCliplist = prior.filter((deletedItem) => {
      return deletedItem.value != findandUpdate.value;
      console.log(deletedItem.value != findandUpdate.value);
    });
    clipList = newCliplist.slice().reverse();
    // Refresh view.
    clipboard.writeText("");
    //Nothing is copied
    if (clipList.length == 0)
      clipList.push({
        value: "A example of clip element",
        time: new Date().toLocaleTimeString(), //new Date().toLocaleDateString() +
        pinned: false,
      });
    createView(clipList);
  } catch (err) {
    console.log("Unable to delete and refresh the list");
    console.log(err);
  }
}

// *******************************************************EXPORTING MODULESS***********************************************************************//

export { clipList, copyToClipboard, pinClicks, deletClicks, copyClicks };
