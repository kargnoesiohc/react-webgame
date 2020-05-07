import React, { memo } from 'react';
import styled from 'styled-components';

const PrizeNum = styled.div`
  display: inline-block;
  border: .5px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
  background: ${props => props.color};
`;

const Ball = memo(({ number }) => {
  let background;
  if (number < 10) {
        background = '#F15F5F';
      } else if (number < 20) {
        background = '#F29661';
      } else if (number < 30) {
        background = '#E5D85C';
      } else if (number < 40) {
        background = '#86E57F';
      } else {
        background = '#6799FF';
      }
  return (
  <PrizeNum color = {background}>{number}</PrizeNum>
  );
});

export default Ball;