import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import { Link,withRouter } from 'react-router-dom';
import { getRoute } from '../../util/backTo';
import './header.less';
@withRouter
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.goBack = this.goBack.bind(this);
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(){

        if(window.scrollY>80){
            this.refs.header.style.background = "rgb(246, 164, 22)";

        }else{
            this.refs.header.style.background = "rgba(0,0,0,0)";
        }
    }
    goBack(){
        console.log(getRoute());
        this.props.history.goBack()
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (

            <div id="header" ref="header">
                <span>{this.props.text}</span>
                <Link to={getRoute()} onClick={this.goBack} className="h-back">
                    <Icon type="left"></Icon>
                </Link>
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