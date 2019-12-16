import React from "react";
import { connect } from "react-redux";

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CategoryDropped: false,
      SortDropped: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown(Dropdown) {
    this.setState({ [Dropdown]: !this.state[Dropdown] });
  }
  setCategory(e) {
    this.props.setCategory(e.target.innerHTML)
   
  }

  setSort(e) {

 
    this.props.setSort(this.props.Data.SortTypes.find(SortType=>(SortType.display===e.target.innerHTML)).SortBy)
   
  }
  setText(e) {
    this.props.setText(e.target.value)
   
  }

  render() {
    let tempArray = [];
    return (
      <div className="FilterMenuWrapper">
        <div>
          <input className="FilterMenuSearch" placeholder="Поиск статьи" type="text" onChange={this.setText.bind(this)}/>
        </div>
        <div className="DropDown">
          <ul
            className="Menu"
            onClick={this.toggleDropdown.bind(this, "SortDropped")}
          >
            <li>
              <div className="MenuContainer">
                <div className="MenuHeader"><div className="MenuTitle">Сортировка </div>{this.props.Data.SortTypes.find(SortType=>(SortType.SortBy===this.props.Data.SortBy)).display} </div>
                <div className="MenuArrow"></div>
              </div>
              <ul
                className="Submenu Z2"
                style={{ display: this.state.SortDropped ? "block" : "" }}
              >{this.props.Data.SortTypes.map(SortType=>( <li  onClick={this.setSort.bind(this)}>{SortType.display}</li>))}
                
              </ul>
            </li>
          </ul>
        </div>{" "}
        <div className="DropDown">
          <ul
            className="Menu"
            onClick={this.toggleDropdown.bind(this, "CategoryDropped")}
          >
            <li>
              <div className="MenuContainer">
                <div className="MenuHeader"><div className="MenuTitle">Категория </div>&nbsp;{this.props.Data.FilterCategory} </div>
                <div className="MenuArrow"></div>
              </div>
              <ul
                className="Submenu Z1"
                style={{ display: this.state.CategoryDropped ? "block" : "" }}
              ><li onClick={this.setCategory.bind(this)}>
              Все статьи
            </li>
                {this.props.Data.Articles.map(item => {
                  if (tempArray.indexOf(item.category) === -1) {
                    tempArray.push(item.category);
                    return (
                      <li onClick={this.setCategory.bind(this)}>
                        {item.category}
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          </ul>
        </div>{" "}
      </div>
    );
  }
}

export default connect(
  store => ({ Data: store }),
  dispatch => ({
    setCategory: Category => {
      dispatch({ type: "SET_CATEGORY", category: Category });
    },
    setText: Text => {
      dispatch({ type: "SET_TEXT", text: Text });
    },
    setSort: Sort => {
      dispatch({ type: "SET_SORT", sort: Sort });
    }
  })
)(FilterMenu);
