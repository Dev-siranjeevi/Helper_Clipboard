
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

// **********************Longitude validator***************************************
    // First let check if the copied is long
    let directionActive;

    if (nilSepCoord.includes("E") || nilSepCoord.includes("W")) { //Check where if it is long
      const longThree = Number(nilSepCoord.substring(1, splitNumdeg)); // split the first 4 letters and check if the values is <= 180.

      if (nilSepCoord.includes("E")) { //Check where if it is long
        directionActive = "E"
      } else if (nilSepCoord.includes("W")) {
        directionActive = "W"
      }
      if (longThree > 180) { // Add "0" as the 2nd character.;
        const finalUpd = directionActive + "0";
        nilSepCoord = nilSepCoord.replace(directionActive, finalUpd);
      }
    }
// **********************Coordinate split***************************************
    if (nilSepCoord.includes("N") || nilSepCoord.includes("S")) { //Check where if it is lattitude
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
    } else {
      return val;
    }

  }

  // Active status
  console.log(`Coordinate module active: ${document.querySelector(".switch-inp").checked}`);
}


function separatorCoord(coor) {
  let remSeparator = coor.replace(/,|·/g, "."); // remove from decimal places
  remSeparator = (remSeparator.replace(/,|°|’|-|'|”|:|"|'/g, "")).replace(/ /g, ""); // remove all the separators // Fill the separator between /  /.
  // console.log(remSeparator);
  return remSeparator;
}
