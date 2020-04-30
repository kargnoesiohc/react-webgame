import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  console.log('렌더ㅏ링');
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});


export default Try;