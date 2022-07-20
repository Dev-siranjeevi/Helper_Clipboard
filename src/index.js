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
  // const hey = clipList.reverse()
  // console.log(hey);
  console.log(clipList);

})

function action(a, attr) {
  const clickedOn = a.srcElement;
  let tags = a.target.localName;
  let indexofclip = a.srcElement.id.replace("clipitem","");
  // console.log(indexofclip);
  let writeToClip ;

  if(clipList.length > 0){
    let prior = clipList.slice().reverse();
     writeToClip = prior[Number(indexofclip)].value;
  }

  if (tags === "p") {
    console.log(writeToClip);
    clipboard.writeText(writeToClip);
    // console.log(clipList);
    clickedOn.classList.add("copied");
    clickedOn.classList.remove("hov");
    setTimeout(()=>{
          clickedOn.classList.remove("copied");
          clickedOn.classList.add("hov");
    }, 1500);
  }
}
