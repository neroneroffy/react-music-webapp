import React, {Component} from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { getRoute } from '../../util/backTo';
import { connect } from 'react-redux';
import { getSongs } from '../../redux/personal.redux';
import SongEditList from '../../components/songs-edit-list/songs-edit-list'
import './collect-songs.less'

@connect(
    state=>state.personal,
    { getSongs }
)
class CollectSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                        编辑
                    </div>
                </div>

                {
                    this.props.songList?
                        <SongEditList data={this.props.songList}></SongEditList>
                        :
                        ""
                }

            </div>
        )
    }
}
export default CollectSongs