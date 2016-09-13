import {Observable} from 'rxjs';

const {fromPromise} = Observable;

import {loadSources, persistSources} from '../../utilities/persist';

export const persistEpic = (action$, store) =>
    action$.ofType('PERSIST_SOURCES')
        .mergeMap(({sources = store.getState().sources.sources}) => fromPromise(persistSources(sources)))
        .map(sources => ({type: 'LOADED_SOURCES', sources}));

export const loadEpic = (action$, store) =>
    action$.ofType('LOAD_SOURCES')
        .mergeMap(_ => fromPromise(loadSources()))
        .map(sources => ({type: 'LOADED_SOURCES', sources}));
