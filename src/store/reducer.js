const InitialState = {
  Articles: [{ picture: "", title: "", date: "", text: "" }],
  SliderPictures: ["", "", "", "", "", "", "", "", ""],
  FilterCategory: "",
  FilterDate: "",
  FilterText: ""
};

const ArticleReducer = (state = InitialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_CATEGORY":
      newState = { ...state, FilterCategory: action.category };
      return newState;
    case "SET_DATE":
      newState = { ...state, FilterCategory: action.date };
      return newState;

    case "SET_TEXT":
      newState = { ...state, FilterCategory: action.text };
      return newState;

    default:
      return state;
  }
 
};

export default ArticleReducer;
