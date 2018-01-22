import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import { Link,withRouter } from 'react-router-dom';
import { getRoute } from '../../util/backTo';
import { connect } from 'react-redux';
import { getSongs } from '../../redux/personal.redux';
import './collect-songs.less'

@connect(
    state=>state.personal,
    { getSongs }
)
class CollectSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        this.props.getSongs(this.props.match.params.id)
    }

    render() {
        return (
            <div id="collect-songs">
                <div className="top-header">
                    <Link to={getRoute()} className="left">
                        <Icon type="left"/>
                        <span>
                           返回
                        </span>
                    </Link>
                    <div className="title">收藏的单曲</div>
                    <div className="right">
                        完成
                    </div>
                </div>
                {
                    this.props.songList?
                        <div className="collect-songd-wrapper">
                            {
                                this.props.songList.map(v=>(
                                    <div className="single-song">
                                        <div className="left">
                                            <div className="name">{v.name}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        ""
                }

            </div>
        )
    }
}
export default CollectSongs