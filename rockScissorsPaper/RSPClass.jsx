import React, { Component } from 'react';

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
class RSP extends Component {
  state = {
    result: '',
    score: 0,
    imgCoord: rspCoords.rock,
  };

  interval;

  changeHand = () => {
    const {imgCoord} = this.state;
    if(imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      });
    } else if(imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else if(imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock,
      });
    } 
}

  componentDidMount() { // 컴포넌트가 첫 렌더링 된 후, 주로 비동기 요청
    this.interval = setInterval(this.changeHand, 1000);
  }

  componentWillUnMount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리
    clearInterval(this.interval);
  }

  

  onClickBtn = (c) => () => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = socres[c];
    const cpuScore = socres[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0){
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)){
       this.setState((prevState) => {
         return {
           result: '이겼습니다!',
           score: prevState.score + 1,
         };
       });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 1000);
    }, 1500);
  };

  render() {
    const {result, score, imgCoord} = this.state;
    return (
      <>
      <div className="wrap">
        <div id="computer" style={{background: `url(./images/rsp.jpeg) ${imgCoord} 0`}}></div>
        <div className="btns"> 
          <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </div>
      </>
    );
  }
}

export default RSP;