import React, {Component} from 'react';
import Try from './Try'

function getNumbers() { //겹치지 않는 숫자 4개 추출
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i++) {
    const home = candidate.splice(Math.floor(Math.random() * (9 - i)),1)[0];
    array.push(home);
  }
  return array;
}

class Baseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };


  onSubmitForm = (e) => {
    const {value, answer, tries, } = this.state;
    e.preventDefault();
    if(value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, { try: value, result: '홈런!'}],
        }
      });
         this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
         });
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9) {
        this.setState( {
          result: `아웃! 답은 ${answer.join(', ')}!  다시 도전하세요.`,
         });
         this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
         });
      } else { 
        for (let i = 0; i < 4; i++) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
          value: '',
          tries: [...prevState.tries, { try: value, result: `${strike}스트라이크 ${ball}볼`}],
          };
        });
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({value: e.target.value, result: '',});
  
  };

  inputRef = (c) => {
    this.input = c;
  };
  
  number =  [
    {num: '1', text: 'a'},
    {num: '2', text: 'b'},
    {num: '3', text: 'c'},
    {num: '4', text: 'd'},
    {num: '5', text: 'e'},
    {num: '6', text: 'f'},
  ];
  render() {
    const {value, tries, result} = this.state;
    return (
      <>
        <h2>숫자야구</h2>
        <form onSubmit={this.onSubmitForm}>
        <input placeholder="숫자를 입력하세요" ref={this.onRefInput} maxLength={4} value={value} onChange={this.onChangeInput} />
        <button>입력</button>
        </form>
        <div>도전 횟수 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return (
              <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
            );
          })}
        </ul>
        <h3>{result}</h3>
      </>
    );
  }
}

export default Baseball; //가져올 때 import Baseball;

//const React = require('react');
//const {Component} = React;
//module.exports = Baseball;