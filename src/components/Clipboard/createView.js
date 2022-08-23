// function checkerA(ar)
import {
  clipList
} from "../clipboard.js"
import {
  pinValidation
} from "./pinClip.js"
export const createView = (list) => {
  const prev = document.getElementById("clipList");
  if (prev !== null) {
    prev.remove(); //remove the old div
  }
  // create a new div with same id and loop through the array.clipboard
  let root = document.createElement("div"); // parent
  root.id = "clipList";
  let prior =  pinValidation(list).slice().reverse();
  prior.forEach((clip, index) => {
    let className = clip.pinned == true ? "clipboard hov pinned" : "clipboard hov";
    let clipId = "clipitem" + index;
    // Create a paragraph element
    let clipview = document.createElement("p");
    clipview.id = clipId;
    clipview.className = className;
    clipview.innerHTML = clip.value;
    // Appended it it to root/.
    root.appendChild(clipview);
    document.getElementById("mainBody").appendChild(root);
  })
}
