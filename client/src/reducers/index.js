import { combineReducers } from 'redux';

import comp from './comp';
import auth from './auth';
import url from './url';
// import leav from './leav';
// import hod from './hod';
// import updt from './updt';
// import balance from './balance';
// import aleav from './aleav'

export const reducers = combineReducers({ auth ,url,comp });
