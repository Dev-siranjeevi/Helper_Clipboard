// function checkerA(ar)
import { clipList, copyClicks, pinClicks, deletClicks } from "../clipboard.js";

export const createView = (list) => {
  let prev = document.querySelectorAll(".clip");
  // console.log(prev);
  // Check and remove exsiting
  try {
    if (prev.length > 0) {
      prev.forEach((exsiting) => {
        exsiting.remove();
      });
    }
  } catch (err) {
    console.log("Issue in removing");
  }

  // create a new div with same id and loop through the array.clipboard
  let prior = list.slice().reverse();
  prior.sort((crr, nxt) => {
    return nxt.pinned - crr.pinned;
  });
  console.log(prior);
  prior.forEach((clip, index) => {
    // console.log(index);
    clips.insertAdjacentHTML(
      "beforeend",
      clipView(clip.value, clip.time, index, clip.pinned, clip.activeCopy)
    );
  });
  addEventsClip();
};
const addEventsClip = () => {
  const copyClips = document.querySelectorAll(".copies");
  const pinClips = document.querySelectorAll(".pin");
  const deleteClips = document.querySelectorAll(".delete-single");

  copyClips.forEach((copy) => {
    copy.addEventListener("click", copyClicks);
  });

  pinClips.forEach((pin) => {
    pin.addEventListener("click", pinClicks);
  });
  deleteClips.forEach((del) => {
    del.addEventListener("click", deletClicks);
  });
};

const clips = document.querySelector(".clips");
let clipView = (data, time, postion, pinstatus, copyStatus) => {
  const clip = `<div class="clip">
        <!-- Clip value -->
        <div class="content copies " id="copies${postion}">
          <p class="content-val noselect ${
            copyStatus ? "activeCopies" : ""
          }" id="clipData${postion}">
          ${data}
          </p>
        </div>
        <!-- actions center -->
        <div class="action fl fl-spbtw fl fl-spbtw-spbtw">
          <div class="timeline noselect">
            <span class="time">
              ${time}
            </span>
          </div>
          <div class="clipAction fl fl-spbtw fl fl-spbtw-spbtw">
          <span class="btn fl">
            <svg class="btn-default copy ${
              copyStatus ? "activeCopiesIcon" : ""
            }"  id="copy${postion}" width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57143 13.125V14.2969C8.57143 14.6852 8.28362 15 7.92857 15H0.642857C0.287812 15 0 14.6852 0 14.2969V3.51562C0 3.12729 0.287812 2.8125 0.642857 2.8125H2.57143V11.4844C2.57143 12.389 3.24431 13.125 4.07143 13.125H8.57143ZM8.57143 3.04688V0H4.07143C3.71638 0 3.42857 0.314795 3.42857 0.703125V11.4844C3.42857 11.8727 3.71638 12.1875 4.07143 12.1875H11.3571C11.7122 12.1875 12 11.8727 12 11.4844V3.75H9.21429C8.86071 3.75 8.57143 3.43359 8.57143 3.04688ZM11.8117 2.13782L10.0454 0.205928C9.92486 0.0740749 9.76136 9.74989e-07 9.59087 0L9.42857 0V2.8125H12V2.63499C12 2.44852 11.9323 2.26968 11.8117 2.13782V2.13782Z" />
            </svg>
            </span>

            <span class="btn fl" >
              <svg
              class="btn-default pin ${
                pinstatus ? "pinactive" : ""
              }"  id="pin${postion}"
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3251 2.61804C12.3599 1.65275 10.7326 1.91683 10.1221 3.13783L8.39285 6.59628C8.22855 6.92486 7.94939 7.18173 7.60829 7.31817L4.01834 8.75415C3.35177 9.02078 3.17498 9.88209 3.68262 10.3897L6.29289 13L3 16.2929V17H3.70711L7 13.7071L9.61027 16.3174C10.1179 16.825 10.9792 16.6482 11.2459 15.9817L12.6818 12.3917C12.8183 12.0506 13.0751 11.7715 13.4037 11.6072L16.8622 9.87793C18.0832 9.26743 18.3472 7.64015 17.382 6.67486L13.3251 2.61804Z"
              fill="#212121"
            />
          </svg>
            </span>
            <span class="btn fl" >
              <svg class="btn-default delete-single" id="del${postion}" width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.857143 13.327C0.857143 13.6927 0.992602 14.0433 1.23372 14.3019C1.47484 14.5604 1.80186 14.7057 2.14286 14.7057H9.85714C10.1981 14.7057 10.5252 14.5604 10.7663 14.3019C11.0074 14.0433 11.1429 13.6927 11.1429 13.327V3.67643H0.857143V13.327ZM8.14286 5.97419C8.14286 5.85231 8.18801 5.73542 8.26838 5.64924C8.34876 5.56305 8.45776 5.51464 8.57143 5.51464C8.68509 5.51464 8.7941 5.56305 8.87447 5.64924C8.95485 5.73542 9 5.85231 9 5.97419V12.4079C9 12.5298 8.95485 12.6467 8.87447 12.7329C8.7941 12.8191 8.68509 12.8675 8.57143 12.8675C8.45776 12.8675 8.34876 12.8191 8.26838 12.7329C8.18801 12.6467 8.14286 12.5298 8.14286 12.4079V5.97419ZM5.57143 5.97419C5.57143 5.85231 5.61658 5.73542 5.69695 5.64924C5.77733 5.56305 5.88634 5.51464 6 5.51464C6.11366 5.51464 6.22267 5.56305 6.30305 5.64924C6.38342 5.73542 6.42857 5.85231 6.42857 5.97419V12.4079C6.42857 12.5298 6.38342 12.6467 6.30305 12.7329C6.22267 12.8191 6.11366 12.8675 6 12.8675C5.88634 12.8675 5.77733 12.8191 5.69695 12.7329C5.61658 12.6467 5.57143 12.5298 5.57143 12.4079V5.97419ZM3 5.97419C3 5.85231 3.04515 5.73542 3.12553 5.64924C3.2059 5.56305 3.31491 5.51464 3.42857 5.51464C3.54224 5.51464 3.65124 5.56305 3.73162 5.64924C3.81199 5.73542 3.85714 5.85231 3.85714 5.97419V12.4079C3.85714 12.5298 3.81199 12.6467 3.73162 12.7329C3.65124 12.8191 3.54224 12.8675 3.42857 12.8675C3.31491 12.8675 3.2059 12.8191 3.12553 12.7329C3.04515 12.6467 3 12.5298 3 12.4079V5.97419ZM11.5714 0.91911H8.35714L8.10536 0.382008C8.05202 0.267181 7.96986 0.170592 7.86812 0.103105C7.76638 0.0356187 7.6491 -8.69693e-05 7.52946 5.03575e-06H4.46786C4.34849 -0.000486988 4.23142 0.0350856 4.13004 0.102647C4.02866 0.170209 3.94708 0.267027 3.89464 0.382008L3.64286 0.91911H0.428571C0.314907 0.91911 0.205898 0.967527 0.125526 1.05371C0.0451529 1.13989 0 1.25678 0 1.37866L0 2.29777C0 2.41965 0.0451529 2.53654 0.125526 2.62272C0.205898 2.7089 0.314907 2.75732 0.428571 2.75732H11.5714C11.6851 2.75732 11.7941 2.7089 11.8745 2.62272C11.9548 2.53654 12 2.41965 12 2.29777V1.37866C12 1.25678 11.9548 1.13989 11.8745 1.05371C11.7941 0.967527 11.6851 0.91911 11.5714 0.91911V0.91911Z" />
              </svg>
            </span>

          </div>
        </div>
      </div>`;
  return clip;
};
