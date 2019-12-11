import React from "react";
import { connect } from "react-redux";

class Slider extends React.Component {
  render() {
    return (
      <div className="sliderContainer">
        <div className="ArrowContainer">
          <div className="ArrowLeft" onClick={this.props.sliderPrev}></div>
        </div>
        {this.props.Data.Articles.slice(
          this.props.Data.SliderLeft,
          this.props.Data.SliderLeft + 4
        ).map((article, index) => (
          <div className="sliderItem">
            <img
              className="sliderImage"
              src={"img/" + article.picture}
              alt=""
            />
          </div>
        ))}
        <div className="ArrowContainer">
          <div className="ArrowRight" onClick={this.props.sliderNext}></div>
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({ Data: store }),
  dispatch => ({
    sliderNext: () => {
      dispatch({ type: "SLIDER_NEXT" });
    },
    sliderPrev: () => {
      dispatch({ type: "SLIDER_PREV" });
    }
  })
)(Slider);
