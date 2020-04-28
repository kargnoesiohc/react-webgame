import React, {useState, useRef} from 'react';
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

const Baseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setResult('');
    if(value === answer.join('')) {
      setResult('홈런!');
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런!'}]
      });
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9) {
        setResult(`아웃! 답은 ${answer.join(', ')}!  다시 도전하세요.`);
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else { 
        for (let i = 0; i < 4; i++) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike}스트라이크 ${ball}볼`}]
        });
        setValue('');
      }
    }
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };
  
  return (
    <>
    <h2>숫자야구</h2>
    <form onSubmit={onSubmitForm}>
    <input placeholder="숫자를 입력하세요" ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
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
};

export default Baseball; //가져올 때 import Baseball;

//const React = require('react');
//const {Component} = React;
//module.exports = Baseball;