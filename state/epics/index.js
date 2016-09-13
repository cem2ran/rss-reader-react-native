import {combineEpics} from 'redux-observable';

import {loadEpic, persistEpic} from './sources';

export default combineEpics(
  loadEpic, persistEpic
);
