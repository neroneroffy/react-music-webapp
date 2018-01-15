import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'antd-mobile';
class Title extends Component {
    state={
        style:{
            fontSize:"18px",
            color:"#646464",
            marginBottom:"8px",
            padding:"0 2.5%",
            display:"flex",
            justifyContent:"space-between",
            alienItems:"center"
        },
        rightStyle:{
            color:"#f68b0e",
            fontSize:"14px",
            display:"flex",
            justifyContent:"flex-end",
            alienItems:"center"
        },
        moreStyle:{
            height:"20px",
            lineHeight:"20px"
        }
    };
    shouldComponentUpdate(nextProps){
        if (nextProps.title === this.props.title){
            return false
        }
        return true
    }
    render() {
        return (
            <div style={this.state.style}>
                <div>
                    {this.props.title}
                </div>
                {
                    this.props.linkTo?
                        <Link to={this.props.linkTo} style={this.state.rightStyle}>
                            <div style={this.state.moreStyle}>更多</div>
                            <Icon type="right"/>
                        </Link>
                        :
                        ""

                }
            </div>
        )
    }
}
export default Title