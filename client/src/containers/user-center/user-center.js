import React, {Component} from 'react';
import "./user-center.less";
class UserCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    };

    render() {
        return (
            <div id="user-center">
                个人中心
                {this.props.match.params.id}
            </div>
        )
    }
}

export default UserCenter