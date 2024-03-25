// [-] copy a coordinate
// [-] check all the lenght
// [-] check if dir available if so move it to front
// [-] remove separators
// [-] split the coord
// [-] round up the seconds
// [-] re construct the coord
// [-] write and add it to the list
const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
let direction = ["N", "S", "E", "W"];
let gsdir = "";
async function intialCoord(active, val) {
  const coordCopied = val;
  gsdir = val;
  const coordLeng = val.length;
  let finalOutput = [];
  if (active) {
    //If coordinate is on then follow the module

    // Check and update the position of the coordinate direction
    direction.forEach((it) => {
      // loop through all the direction
      if (coordCopied.includes(it)) {
        if (coordCopied.indexOf(it) == coordCopied.length - 1) {
          gsdir = it + coordCopied.replace(it, ""); // remove the direction from it location and replace it at as the initial letter.
        }
      }
    });
    // remove all separators
    let nilSepCoords = await separatorCoord(gsdir);
    nilSepCoords = await separatorCoord(nilSepCoords);
    let identifyCord = [];
    const checkLong = nilSepCoords
      .split("")
      .some((e) => e.includes("E") || e.includes("W"));
    const checkLat = nilSepCoords
      .split("")
      .some((e) => e.includes("N") || e.includes("S"));
    if (checkLong && checkLat) {
      const idnt = nilSepCoords.includes("E")
        ? nilSepCoords.indexOf("E")
        : nilSepCoords.includes("W");
      console.log(nilSepCoords);
      identifyCord.push(nilSepCoords.substr(0, idnt));
      identifyCord.push(nilSepCoords.substr(idnt));
    } else {
      identifyCord.push(nilSepCoords);
    }
    console.log(identifyCord);
    identifyCord.forEach((nilSepCoord) => {
      // Get the direction of the coord and split accordingly
      let splitNumdeg = 4;
      let splitNummin = 6;

      // **********************Longitude validator***************************************
      // First let check if the copied is long
      let directionActive;

      if (nilSepCoord.includes("E") || nilSepCoord.includes("W")) {
        //Check where if it is long
        const longThree = Number(nilSepCoord.substring(1, splitNumdeg)); // split the first 4 letters and check if the values is <= 180.

        if (nilSepCoord.includes("E")) {
          //Check where if it is long
          directionActive = "E";
        } else if (nilSepCoord.includes("W")) {
          directionActive = "W";
        }
        if (longThree > 180) {
          // Add "0" as the 2nd character.;
          const finalUpd = directionActive + "0";
          nilSepCoord = nilSepCoord.replace(directionActive, finalUpd);
        }
      }
      // **********************Coordinate split***************************************
      if (nilSepCoord.includes("N") || nilSepCoord.includes("S")) {
        //Check where if it is lattitude
        splitNumdeg = 3;
        splitNummin = 5;
      }

      let splitCoord = [
        nilSepCoord.substring(0, splitNumdeg),
        nilSepCoord.substring(splitNumdeg, splitNummin),
        nilSepCoord.substring(splitNummin),
      ];

      if (splitCoord[2].length > 8) {
        // console.log(N40 50 15.733);Nco ns NaN
        const addZero = splitCoord[2].indexOf("0") == 0 ? "0" : "";
        const removed = Number(splitCoord.pop());
        splitCoord.push(addZero + removed.toFixed(3));
      }
      const [deg, min, sects] = splitCoord;
      const gsCoord = deg + " " + min + " " + sects;

      if (gsCoord != "  " && sects != NaN && sects != undefined) {
        finalOutput.push(gsCoord);
      } else {
        // finalOutput.push(val);
      }
    });
    console.log(finalOutput);
    return finalOutput;
  }
}

async function separatorCoord(coor) {
  let remSeparator = coor.replace(/,|·/g, "."); // remove from decimal places
  let sepa = await readFile("./src/Data/Demo.txt");
  sepa = sepa.split("\n").map((e) => e.replace("\r", ""));
  sepa.forEach((sep) => {
    remSeparator = remSeparator.replace(sep, " ");
  });
  remSeparator = remSeparator.replace(/ /g, ""); // remove all the separators // Fill the separator between /  /.
  // let remSeparator = coor.replace(/,|·/g, "."); // remove from decimal places
  // remSeparator = remSeparator
  //   .replace(/,|°|’|-|'|”|:|"|'|º/g, "")
  //   .replace(/ /g, ""); // remove all the separators // Fill the separator between /  /.
  // // console.log(remSeparator);
  // let remSeparator = coor;
  return remSeparator;
}

export { intialCoord };
