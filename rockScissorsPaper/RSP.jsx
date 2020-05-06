import React, { useState, useRef, useEffect } from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount 
// (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render - conponentDidUpdate
// (부모가 자식을 없앴을 때 )-> componentWillUnmount -> 소멸

const rspCoords = {
  rock: '0',
  paper: '285px',
  scissor: '557px',
};

const socres = {
  scissor: 1,
  rock: 0,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find( function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const interval = useRef();

  useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
    interval.current = setInterval(changeHand, 50);
    return () => { //componentWillUnmount 역할
      clearInterval(interval.current);

    }
  }, [imgCoord]);

  const changeHand = () => {
    if(imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if(imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if(imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    } 
  };

  const onClickBtn = (c) => () =>{
    clearInterval(interval.current);
    const myScore = socres[c];
    const cpuScore = socres[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0){
      setResult('비겼습니다!')
    } else if ([-1, 2].includes(diff)){
      console.log('이김')
      setResult('이겼습니다!')
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 1000);
    }, 1500);
  };
  
  return (
    <>
      <div className="wrap">
        <div id="computer" style={{background: `url(./images/rsp.jpeg) ${imgCoord} 0`}}></div>
        <div className="btns"> 
          <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
          <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
          <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </div>
    </>
  );
}

export default RSP;