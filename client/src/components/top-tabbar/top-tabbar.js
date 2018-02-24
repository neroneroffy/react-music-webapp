import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import './top-tabbar.less';
import { HOST } from '../../const/host'

class TopTabbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entry:[
                {
                    name:"曲库",
                    path:`${HOST}/repertoire`,
                    icon:require('../../icons/music.png')
                },
                {
                    name:"发现",
                    path:`${HOST}/discover`,
                    icon:require('../../icons/headphones.png')
                },
                {
                    name:"我的",
                    path:`${HOST}/me`,
                    icon:require('../../icons/user.png')
                },

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