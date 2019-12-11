import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Slider from "./slider";
import FilterMenu from "./FilterMenu";
import ArticlesContainer from "./ArticlesContainer";
import "./slider.scss";
import "./FilterMenu.scss";
import "./Document.scss";

const DefaultText =
  "Текст написан, чтобы сформировать представление о том как будет выглядеть эта страница, наполненная контентом. На данный момент у меня нет ни малейшего представления, какую информацию должна содержать, данная статья.";
const InitialState = {
  Articles: [
    {
      picture: "1.jpg",
      title: "Очень красивое поселение на берегу горного озера",
      date: new Date(2014, 11, 4),
      text:
        "Статья про очень красивое поселение на берегу горного озера.Живописный вид и из окна дома просто завораживает.Вода,скатывающаяся с горных склонов-кристально чиста! Конечно, человеку, неподготовленному крайне тяжело здесь пребывать, а тем более совершать тяжелую физическую работу, из-за рязряженности возздуха, но со временем организм адаптируется к местному воздуху",
      category: "Дома мира"
    },
    {
      picture: "2.jpg",
      title: "Завораживающие наскальные пейзажи",
      date: new Date(2017, 1, 24),
      text:
        "Величаешие рукотворные пейзажи из скал не оставят равнодушним даже опытного путешественника.",
      category: "Мировой Океан"
    },
    {
      picture: "3.jpg",
      title: "Красоты средней полосы России",
      date: new Date(2014, 1, 11),
      text: DefaultText,
      category: "Красоты России"
    },
    {
      picture: "4.jpg",
      title: "Древние мельницы Ирландии",
      date: new Date(2017, 10, 5),
      text: DefaultText,
      category: "Дома мира"
    },
    {
      picture: "5.jpg",
      title: "Камменная Исландия",
      date: new Date(2018, 11, 4),
      text: DefaultText,
      category: "Иностранные пейзажи"
    },
    {
      picture: "6.jpg",
      title: "Золотая осень",
      date: new Date(2019, 8, 18),
      text: DefaultText,
      category: "Красоты России"
    },

    {
      picture: "8.jpg",
      title: "Тропа в реликтовых лесах",
      date: new Date(2017, 11, 21),
      text: DefaultText,
      category: "Иностранные пейзажи"
    },
    {
      picture: "9.jpg",
      title: "Зачаровывающие леса Канады",
      date: new Date(2019, 3, 15),
      text: DefaultText,
      category: "Иностранные пейзажи"
    }
  ],

  FilterCategory: "Все статьи",
  SortBy: "",
  SortTypes: [
    { display: "отсутвует", SortBy: "" },
    { display: "по возрастанию даты", SortBy: "date" },
    { display: "по убыванию даты", SortBy: "datedesc" },
    { display: "по возрастнию заголовка", SortBy: "title" },
    { display: "по убыванию заголовка", SortBy: "titledesc" }
  ],
  FilterText: "",
  FilteredQuantity: 9,
  SliderLeft: 0
};

const Reducer = (state = InitialState, action) => {
  let newState;
  switch (action.type) {
    case "SET_CATEGORY":
      newState = { ...state, FilterCategory: action.category };
      return newState;
    case "SET_SORT":
      newState = { ...state, SortBy: action.sort };
      return newState;

    case "SET_TEXT":
      newState = { ...state, FilterText: action.text };
      return newState;
    case "SLIDER_NEXT":
      if (state.SliderLeft + 5 <= state.Articles.length) {
        newState = { ...state, SliderLeft: state.SliderLeft + 1 };
        return newState;
      } else return state;
    case "SLIDER_PREV":
      if (state.SliderLeft - 1 >= 0) {
        newState = { ...state, SliderLeft: state.SliderLeft - 1 };
        return newState;
      } else return state;
    default:
      return state;
  }
};

const store = createStore(Reducer, InitialState);

ReactDOM.render(
  <Provider store={store}>
    <Slider />
    <FilterMenu />
    <ArticlesContainer />
  </Provider>,
  document.getElementById("root")
);
