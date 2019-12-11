import React from "react"
import Articles from "./Articles"
import {connect} from "react-redux"


class ArticlesContainer extends React.Component{


    render(){
        return(

<Articles Data={this.props.Data}/>
        )
    }
}

export default connect(store=>({Data:store}),dispatch=>({}))(ArticlesContainer)