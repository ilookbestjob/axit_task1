import React from "react";
import "./Articles.scss";
import { array } from "prop-types";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    //функция сортировки статей
    this.SORT_FUNCTION = (prevArticle, nextArticle) => {
      switch (this.props.Data.SortBy) {
        case "date":
          return new Date(prevArticle.date) - new Date(nextArticle.date);

        case "datedesc":
          return new Date(nextArticle.date) - new Date(prevArticle.date);

        case "title":
          if (prevArticle.title.toLowerCase() < nextArticle.title.toLowerCase())
            return -1;
          if (nextArticle.title.toLowerCase() > prevArticle.title.toLowerCase())
            return 1;
          return 0;

        case "titledesc":
          if (prevArticle.title.toLowerCase() > nextArticle.title.toLowerCase())
            return -1;
          if (nextArticle.title.toLowerCase() < prevArticle.title.toLowerCase())
            return 1;
          return 0;

        case "":
          return 0;
      }
    };
    //функция фильтрации статей
    this.FILTER_FUNCTION = article =>
      (this.props.Data.FilterCategory === article.category ||
        this.props.Data.FilterCategory === "Все статьи") &&
      (article.title.indexOf(this.props.Data.FilterText) !== -1 ||
        this.props.Data.FilterText === "");
    //функция форматирования времени
    this.MAKE_TIME = TitleDate => {
      let TEMP_DATE = new Date(TitleDate);
      return (
        (TEMP_DATE.getDate() < 10
          ? "0" + TEMP_DATE.getDate()
          : TEMP_DATE.getDate()) +
        "." +
        (TEMP_DATE.getMonth() < 10
          ? "0" + TEMP_DATE.getMonth()
          : TEMP_DATE.getMonth()) +
        "." +
        TEMP_DATE.getFullYear()
      );
    };
//функция подсвечивания найденных данных
    this.SELECT_FOUND = text => {
      if (this.props.Data.FilterText !== "") {
        const splited = text.split(this.props.Data.FilterText);

        return splited.map((Subtext, index, SplitedArray) => (
          <span>
            <span>{Subtext}</span>

            {SplitedArray.length !== index + 1 ? (
              <span className="FoundText">{this.props.Data.FilterText}</span>
            ) : (
              ""
            )}
          </span>
        ));
      } else {
        return text;
      }
    };
  }

  render() {
    return this.props.Data.Articles.filter(this.FILTER_FUNCTION)
      .sort(this.SORT_FUNCTION)
      .map(article => {
        const TEMP_DATE = new Date(article.date);

        return (
          <div className="ArticlesWrapper">
            <div>
              <img
                src={"img/" + article.picture}
                className="ArticlePicture"
                alt=""
              />
            </div>
            <div className="ArticleContent">
              <div className="ArticleTitle">
                {this.SELECT_FOUND(article.title)}
              </div>
              <div className="ArticleText">{article.text}</div>

              <div className="ArticleFooter">
                <div>
                  <div className="FooterHeader">Категория </div> &nbsp;
                  {article.category}
                </div>
                <div>
                  {" "}
                  <div className="FooterHeader">Дата</div> &nbsp;
                  {this.MAKE_TIME(article.date)}
                </div>
              </div>
            </div>
          </div>
        );
      });
  }
}

export default Articles;
