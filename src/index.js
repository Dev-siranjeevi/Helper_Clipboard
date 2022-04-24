const {
  ipcRenderer,
  clipboard
} = require("electron");

const getDataBtn = document.getElementById("get");


let clipList = []; //Set an empty array



const copyToClipboard = () => {
  const clip = clipboard.readText() //Get the clipboard text\
  if (clip !== "") {
    if (clipList.includes(clip) === false) { //Check if the element exist in the array
      clipList.push(clip) //if not then push
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

setInterval(copyToClipboard, 500); //Run it ever 500 ms



// copy element
document.addEventListener("click", (a) => {
  const clickedOn = a.srcElement;
  let tags = a.target.localName;

  let writeToClip = clickedOn.innerHTML;
  if (tags === "p") {
    clipboard.writeText(writeToClip);
    clipList.splice(clipList.indexOf(writeToClip), 1, writeToClip)
  }

})

document.getElementById("clear").addEventListener("click", () => {
  clipList = [];
  clipboard.writeText("");
  createView();
})
