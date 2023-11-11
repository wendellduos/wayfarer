// create buttons in DOM
let keysLayout = [
  ["-", "+", "-", "+", "-", "-", "+", "-", "+", "-", "+", "-"],
  ["-", "+", "-", "+", "-", "-", "+", "-", "+", "-", "+", "-", "-", "+", "-", "+", "-"],
];

const whiteKeyBtnBottom = document.getElementById("white-btn-row-bottom");
const blackKeyBtnBottom = document.getElementById("black-btn-row-bottom");

const whiteKeyBtnTop = document.getElementById("white-btn-row-top");
const blackKeyBtnTop = document.getElementById("black-btn-row-top");

keysLayout.forEach((row, index) => {
  if (index === 0) {
    row.forEach((symbol, i) => {
      switch (symbol) {
        case "-":
          whiteKeyBtnBottom.innerHTML += `<button type="button" class="white-keys" onclick="playNote(this.dataset.note)" data-note="${i}"></button>`;
          break;
        case "+":
          blackKeyBtnBottom.innerHTML += `<button type="button" class="black-keys" onclick="playNote(this.dataset.note)" data-note="${i}"></button>`;
      }
    });
  } else {
    row.forEach((symbol, i) => {
      switch (symbol) {
        case "-":
          whiteKeyBtnTop.innerHTML += `<button type="button" class="white-keys" onclick="playNote(this.dataset.note)" data-note="${
            keysLayout[0].length + i
          }"></button>`;
          break;
        case "+":
          blackKeyBtnTop.innerHTML += `<button type="button" class="black-keys" onclick="playNote(this.dataset.note)" data-note="${
            keysLayout[0].length + i
          }"></button>`;
      }
    });
  }
});

// initial parameters

let transpose = 0;
let initialNote = function () {
  return 48 + transpose;
};

function transposeKeys(amount) {
  console.log(transpose);
  transpose += Number(amount);
  console.log(transpose);
}

/* listen for keyboard input, then verifies if pressed key matches keyboard bind list
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

function playNote(keyCount) {
  let freq = freqList[initialNote() + Number(keyCount)];

  let osc = new OscillatorNode(c, {
    type: "triangle",
    frequency: freq,
  });

  osc.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + 1);
}
