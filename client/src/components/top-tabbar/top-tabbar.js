import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import './top-tabbar.less';


class TopTabbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry:[
                {
                    name:"曲库",
                    path:`/repertoire`,
                    icon:require('../../icons/music.png')
                },
                {
                    name:"我的",
                    path:`/me`,
                    icon:require('../../icons/user.png')
                },
                {
                    name:"发现",
                    path:`/discover`,
                    icon:require('../../icons/headphones.png')
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
                            <div>
                                <img src={v.icon} alt=""/>
                            </div>
                            <div>
                                {v.name}
                            </div>

                        </NavLink>
                    ))
                }
            </div>
        )
    }
}
export default TopTabbar