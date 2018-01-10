import React, {Component} from 'react';

class Title extends Component {
    state={
        style:{
            fontSize:"18px",
            color:"#646464",
            marginBottom:"8px"
        }
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