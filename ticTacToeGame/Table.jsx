import React, { memo } from 'react';
import Tr from './Tr';
import styled from 'styled-components';


const GameTable = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
`

const Table = memo(({ tableData, dispatch }) => {
  return (
    <GameTable>
      {Array(tableData.length).fill().map((tr, i) => (<Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>))}
    </GameTable>
  );
});

export default Table;