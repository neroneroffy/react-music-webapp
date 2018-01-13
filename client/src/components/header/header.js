import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import './header.less';
@withRouter
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.goBack = this.goBack.bind(this)
    }

    goBack(){
        this.props.history.goBack()
    }
    render() {
        return (
            <div id="header">
                <div onClick={this.goBack}>
                    <Icon type="left"></Icon>
                    <span>{this.props.text}</span>
                </div>
                {
                    this.props.operate?
                        <div onClick={this.props.onClick}>{this.props.operate}</div>
                        :
                        null
                }

            </div>
        )
    }
}
export default Header