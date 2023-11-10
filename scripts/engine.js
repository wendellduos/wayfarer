// create buttons in DOM
let keysLayout = [
  ["-", "+", "-", "+", "-", "-", "+", "-", "+", "-", "+", "-"],
  ["-", "+", "-", "+", "-", "-", "+", "-", "+", "-", "+", "-", "-", "+", "-", "+", "-"],
];

const bottomBtnRow = document.getElementById("bottom-btn-row");
const topBtnRow = document.getElementById("top-btn-row");

keysLayout.forEach((row, index) => {
  if (index === 0) {
    row.forEach((symbol, i) => {
      switch (symbol) {
        case "-":
          bottomBtnRow.innerHTML += `<button type="button" class="white-keys" onclick="playNote(this.dataset.note)" data-note="${i}"></button>`;
          break;
        case "+":
          bottomBtnRow.innerHTML += `<button type="button" class="black-keys" onclick="playNote(this.dataset.note)" data-note="${i}"></button>`;
      }
    });
  } else {
    row.forEach((symbol, i) => {
      switch (symbol) {
        case "-":
          topBtnRow.innerHTML += `<button type="button" class="white-keys" onclick="playNote(this.dataset.note)" data-note="${
            keysLayout[0].length + i
          }"></button>`;
          break;
        case "+":
          topBtnRow.innerHTML += `<button type="button" class="black-keys" onclick="playNote(this.dataset.note)" data-note="${
            keysLayout[0].length + i
          }"></button>`;
      }
    });
  }
});

/* listen for keyboard input, then verifies if pressed key matches keyboard bind list.
   trigger playNote function with corresponding keyboardBind index */
addEventListener("keydown", ({ key }) => {
  keyboardBinds.forEach((e, i) => {
    if (e === key) {
      playNote(i);
    }
  });
});

// audio context and master gain
const c = new AudioContext();
const masterGain = new GainNode(c, {
  gain: 0.5,
});

masterGain.connect(c.destination);

// initial parameters
let transpose = 0;
let initialNote = 48 + transpose;

function playNote(keyCount) {
  let freq = freqList[initialNote + Number(keyCount)];

  let osc = new OscillatorNode(c, {
    type: "triangle",
    frequency: freq,
  });

  osc.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 1);
}