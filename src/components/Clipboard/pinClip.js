import {
  clipList
} from "../clipboard.js"
import {
  createView
} from "./createView.js"


export function pinClip(eventvalue,list) {
  // Parent selector
  const clickedOn = eventvalue.srcElement;
  let tags = eventvalue.target.localName;


  if (tags === "p") {// check if the click element is a para
    // let{pin,unpin} = ;
    // reverse cliplist
    const reverseClipList = pinValidation(list).slice().reverse();//[...pin,...unpin];
    // fetch the position of the element by replacing text
    let clickedOnID = Number(clickedOn.id.replace("clipitem", ""));
    let pinClip = reverseClipList[clickedOnID];
    // Pin and unpin any clip
    clickedOn.className.includes("pinned") ? clickedOn.classList.remove("pinned") : clickedOn.classList.add("pinned");
    // Check if an element is pinned if not pin it or remove.
    if (pinClip.pinned == false) {
      pinClip.pinned = true
    } else {
      pinClip.pinned = false
    }
  }


}
export function pinValidation(clip) {
  let pinnedList = clip.filter((item) => item.pinned);
  let unpinnedList = clip.filter((item) => !item.pinned);
  return [...unpinnedList,...pinnedList]
}
