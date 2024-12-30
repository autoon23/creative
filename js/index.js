const answer = "APPLE";

let attepmts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const overlay = document.createElement("div");
    overlay.style =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); display: flex; justify-content: center; align-items: center; z-index: 9999;";

    const message = document.createElement("div");
    message.innerText = "축하드립니다!";
    message.style =
      "color: yellow; font-size: 3rem; font-weight: bold; text-align: center;";

    overlay.appendChild(message);
    document.body.appendChild(overlay);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attepmts === 6) return gameover();
    attepmts += 1;
    index = 0;
  };

  const updateKeyboard = (letter, color) => {
    const keyBlock = document.querySelector(
      `.keyboard-block[data-key='${letter.toLowerCase()}']`
    );
    if (
      keyBlock &&
      (!keyBlock.style.backgroundColor ||
        keyBlock.style.backgroundColor !== "#6AAA64")
    ) {
      keyBlock.style.backgroundColor = color;
      keyBlock.style.color = "white";
    }
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attepmts}${i}']`
      );
      const letter = block.innerText;
      const rightLetter = answer[i];
      if (letter === rightLetter) {
        맞은_갯수 += 1;
        block.style.backgroundColor = "#6AAA64";
        updateKeyboard(letter, "#6AAA64");
      } else if (answer.includes(letter)) {
        block.style.backgroundColor = "#C9B458";
        updateKeyboard(letter, "#C9B458");
      } else {
        block.style.backgroundColor = "#787C7E";
        updateKeyboard(letter, "#787C7E");
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attepmts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };

  const handleInput = (key) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attepmts}${index}']`
    );

    if (key === "BACKSPACE") {
      handleBackspace();
    } else if (index === 5) {
      if (key === "ENTER") {
        handleEnterKey();
      } else return;
    } else if (/^[A-Z]$/.test(key)) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    if (key === "BACKSPACE" || key === "ENTER" || /^[A-Z]$/.test(key)) {
      handleInput(key);
    }
  };

  const handleKeyboardClick = (event) => {
    const key = event.target.dataset.key?.toUpperCase();
    if (key) {
      if (key === "BACK") {
        handleInput("BACKSPACE"); // 백스페이스 역할 수행
      } else {
        handleInput(key);
      }
    }
  };

  const startTime = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  document
    .querySelector("footer")
    .addEventListener("click", handleKeyboardClick);
  startTime();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
