const React = require('react');
const {useState, useRef} = React;

const WordRelay = () => {
  const[word, setWord] = useState('시작');
  const[value, setValue] = useState('');
  const[result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length-1] === value[0] && (value.length > 1 && value.length  <= 3)) {
      setResult('다음');
      setWord(value);
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <>
    <div>{word}</div>
    <form onSubmit={onSubmitForm}>
      
      <input ref={inputRef} type="text" value={value} onChange={onChangeInput} placeholder="글자를 입력하세요."/>
      <button>입력</button>
      <div>{result}</div>
    </form>
    </>
  )
}

module.exports = WordRelay;