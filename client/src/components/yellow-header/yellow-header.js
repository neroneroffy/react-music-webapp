import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { getRoute } from '../../util/backTo';
import './yellow-header.less'
class YellowHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="yellow-header">
                <Link to={getRoute()} className="left">
                    <Icon type="left"/>
                        <span>
                           返回
                        </span>
                </Link>
                <div className="title">{this.props.title}</div>
            </div>
        )
    }
}
export default YellowHeader