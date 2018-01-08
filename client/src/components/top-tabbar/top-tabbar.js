import React, {Component} from 'react';
import { NavLink,withRouter } from 'react-router-dom'
import './top-tabbar.less';
@withRouter

class TopTabbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry:[
                {
                    name:"曲库",
                    path:`${this.props.match.url}/repertoire`
                },
                {
                    name:"我的",
                    path:`${this.props.match.url}/me`
                },
                {
                    name:"发现",
                    path:`${this.props.match.url}/discover`
                }

            ]
        }
    }
    componentDidMount(){
    }

    render() {
        return (
            <div id="top-tabbar">
                {
                    this.state.entry.map(v=>(
                        <NavLink
                            key={v.path}
                            to={v.path}
                            activeClassName="current"
                        >
                            {v.name}
                        </NavLink>
                    ))
                }
            </div>
        )
    }
}
export default TopTabbar