import React, {Component} from 'react';

class Title extends Component {
    state={
        style:{
            fontSize:"18px",
            color:"#646464",
            marginBottom:"8px",
            padding:"0 2.5%"
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
                {this.props.title}
            </div>
        )
    }
}
export default Title