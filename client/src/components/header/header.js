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
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(){
        if(window.scrollY>10){
            this.refs.header.style.background = "rgba(0,0,0,0.5)";

        }else{
            this.refs.header.style.background = "rgba(0,0,0,0)";

        }
    }
    goBack(){
        this.props.history.goBack()
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (

            <div id="header" ref="header">
                <span>{this.props.text}</span>
                <div onClick={this.goBack} className="h-back">
                    <Icon type="left"></Icon>
                </div>
                {
                    this.props.operate?
                        <div onClick={this.props.onClick} className="h-operate">{this.props.operate}</div>
                        :
                        null
                }

            </div>

        )
    }
}
export default Header