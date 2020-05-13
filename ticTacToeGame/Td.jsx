import React, {useCallback, memo} from 'react';
import { CLICK_CELL } from './TicTacToe';
import styled from 'styled-components';



const TableTd = styled.td`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 50px;
`

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); //action
  },[cellData]);

  return (
    <TableTd onClick={onClickTd}>{cellData}</TableTd>
  )
});

export default Td;