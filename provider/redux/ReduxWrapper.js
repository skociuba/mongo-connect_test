'use client';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from './store';

const ReduxWrapper = ({children}) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxWrapper;
