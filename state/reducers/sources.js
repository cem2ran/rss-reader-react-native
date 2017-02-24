//@flow
type Action =
  | { type: "REORDER_SOURCES", from: number, to: number }
  | { type: "LOADED_SOURCES", sources: Array<Object> }
  | { type: "ADD_SOURCE" }
  | { type: "REMOVE_SOURCE" }
  | { type: "CHANGE_PAGE", page: number };

type State = {
  sources: Array<Object>
};

const initialState: State = {
  sources: [],
  page: 0
};

function move(array, old_index, new_index) {
  var copy = [...array];
  if (new_index >= copy.length) {
    var k = new_index - copy.length;
    while (k-- + 1) {
      copy.push(undefined);
    }
  }
  copy.splice(new_index, 0, copy.splice(old_index, 1)[0]);
  return copy;
}

const sources = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "LOADED_SOURCES":
      return {
        ...state,
        sources: action.sources
      };
    case "REORDER_SOURCES":
      return {
        ...state,
        sources: move(state.sources, action.from, action.to)
      };
    case "CHANGE_PAGE":
      return { ...state, page: action.page };
    default:
      return state;
  }
};

export default sources;
