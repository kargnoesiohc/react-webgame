import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Response from './Response';

const Hot = hot(Response);

ReactDom.render(<Hot/>, document.querySelector('#root'));