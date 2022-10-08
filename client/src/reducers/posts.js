import { CREATE, DELETE, FETCH_ALL, LOADING_POSTS, UPDATE } from "../constants/actionTypes";

const reducer = (state = { isLoading: false, posts: [] }, action) => {
  switch(action.type) {
    case LOADING_POSTS:
      return { ...state, isLoading: true };
    case FETCH_ALL:
      return { ...state, isLoading: false, posts: action.payload };
    case CREATE:
      return { ...state, isLoading: false, posts: [ ...state.posts, action.payload ]};
    case UPDATE:
      return { ...state, isLoading: false, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
    case DELETE:
      return { ...state, isLoading: false, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

export default reducer;
