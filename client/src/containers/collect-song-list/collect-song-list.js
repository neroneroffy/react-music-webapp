import React, {Component} from 'react';
import YellowHeader from '../../components/yellow-header/yellow-header';
import MySongList from '../../components/my-song-list/my-song-list';
import { getCollectSongList } from '../../redux/personal.redux';
import { connect } from 'react-redux';
import './collect-song-list.less';
@connect(
    state=>state.personal,
    { getCollectSongList }
)
class CollectSongList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.getCollectSongList(this.props.match.params.id)
    }
    render() {
        return (
            <div id="collect-song-list">
                <YellowHeader title="收藏的歌单"/>
                <div className="collect-song-list-wrapper">
                    {
                        this.props.collectSongList?
                            <MySongList data={this.props.collectSongList} allowDelete={true}/>
                            :
                            ""
                    }

                </div>


            </div>
        )
    }
}
export default CollectSongList