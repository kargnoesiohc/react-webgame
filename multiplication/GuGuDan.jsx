const React = require('react');
const {useState, useRef} = React;


const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second) {
      setResult(`${first} X ${second} = ${value} 정답입니다.` );
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
    } else {
      setResult('틀렸습니다.');
      setValue('');
    }
    inputRef.current.focus();
  };

  //컨텐츠
  return (
    <>
    <div>{first} X {second} = ?</div>
    <form onSubmit={onSubmitForm}>
      <input ref={inputRef} value={value} onChange={onChangeInput}/>
      <button>입력</button>
    </form>
    <div id="result">{result}</div>
  </>
  );
}

module.exports = GuGuDan;