const answer = "APPLE";

let attepmts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:100px";
    document.body.appendChild(div);
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
      } else if (answer.includes(letter)) {
        block.style.backgroundColor = "#C9B458";
      } else {
        block.style.backgroundColor = "#787C7E";
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

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attepmts}${index}']`
    );

    if (event.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
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

  startTime();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
