import React, {Component} from 'react';

class WhiteSpace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style:{
                width:"100%",
                height:"15px",
                background:"#f5f5f5",
                margin:"12px 0"
            }
        }
    }
    shouldComponentUpdate(){
        return false
    }
    render() {
        return (
            <div style={this.state.style}></div>
        )
    }
}
export default WhiteSpace