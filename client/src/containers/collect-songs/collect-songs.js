import React, {Component} from 'react';
import YellowHeader from '../../components/yellow-header/yellow-header'
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
        this.state = {
            userId:""
        };
    }
    componentDidMount(){
        this.setState({
            userId:sessionStorage.getItem('userId')
        },()=>{
            this.props.getSongs(this.state.userId,this.props.match.params.id)
        })

    }
    render() {
        return (
            <div id="collect-songs">
                <YellowHeader title={this.props.match.params.id?"歌单详情":"收藏的歌曲"}/>
                {
                    this.props.songList?
                        <SongEditList option={true} data={this.props.songList} style={{"position":"fixed","top":"40px","left":"0"}} listStyle={{"marginTop":"90px"}}/>
                        :
                        ""
                }

            </div>
        )
    }
}
export default CollectSongs