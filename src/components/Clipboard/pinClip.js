import {
  clipList
} from "../clipboard.js"
export function pinClip(eventvalue){
  // Parent selector
  const clickedOn = eventvalue.srcElement;
  let tags = eventvalue.target.localName;

  if (tags === "p") {
    // reverse cliplist
    const reverseClipList = clipList.slice().reverse();
    let clickedOnID = Number(clickedOn.id.replace("clipitem", ""));
    let pinClip = reverseClipList[clickedOnID];
    // Pin and unpin any clip
    clickedOn.className.includes("pinned") ? clickedOn.classList.remove("pinned") : clickedOn.classList.add("pinned");
    console.log(clipList);
    // Check if an element is pinned if not pin it or remove.
    if(pinClip.pinned == false){
      pinClip.pinned = true
        // notify("Pin")
    }else{
      pinClip.pinned = false
        // notify("Un pin")
    }

  }

}
