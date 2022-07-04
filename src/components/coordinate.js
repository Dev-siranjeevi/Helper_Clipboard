export function cal() {
  // console.log("Hey there I am coordinate")
}

// [-] copy a coordinate
// [-] check all the lenght
// [-] check if dir available if so move it to front
// [-] remove separators
// [-] split the coord
// [-] round up the seconds
// [-] re construct the coord
// [-] write and add it to the list

let direction = ["N", "S", "E", "W"];
let gsdir = "";
export function intialCoord(active, val) {
  const coordCopied = val;
  const coordLeng = val.length;
  if (active) { //If coordinate is on then follow the module

    // Check and update the position of the coordinate direction
    direction.forEach((it) => { // loop through all the direction
      if (coordCopied.includes(it)) {
        gsdir = it + coordCopied.replace(it, "") // remove the direction from it location and replace it at as the initial letter.
      }
    });
    // remove all separators
    let nilSepCoord = separatorCoord(gsdir);
    nilSepCoord = separatorCoord(nilSepCoord)
    // Get the direction of the coord and split accordingly
    let splitNumdeg = 4;
    let splitNummin = 6;
    if (nilSepCoord.includes("N") || nilSepCoord.includes("S")) {
      splitNumdeg = 3;
      splitNummin = 5;
    }
    let splitCoord = [nilSepCoord.substring(0, splitNumdeg), nilSepCoord.substring(splitNumdeg, splitNummin), nilSepCoord.substring(splitNummin)];

    if (splitCoord[2].length > 8) {
      // console.log(N40 50 15.733);Nco ns NaN
      const addZero = splitCoord[2].indexOf("0") == 0 ? "0" : "";
      const removed = Number(splitCoord.pop());
      splitCoord.push(addZero + removed.toFixed(3));
    }

    const [deg, min, sects] = splitCoord;
    const gsCoord = deg + " " + min + " " + sects;
        if (gsCoord != "  " && sects != NaN && sects != undefined) {
          return gsCoord;
        }else{
          return val;
        }

      }
}


function separatorCoord(coor) {
  let remSeparator = coor.replace(/,/g, "."); // remove from decimal places
  remSeparator = (remSeparator.replace(/,|°|’|-|'|”|:|"|'/g, "")).replace(/ /g, ""); // remove all the separators // Fill the separator between /  /.
  // console.log(remSeparator);
  return remSeparator;
}
