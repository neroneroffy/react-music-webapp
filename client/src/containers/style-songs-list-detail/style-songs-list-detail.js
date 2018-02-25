import React, {Component} from 'react';
import './style-songs-list-detail.less';
import YellowHeader from '../../components/yellow-header/yellow-header'
import { connect } from 'react-redux';
import { getSongs } from '../../redux/publicSongs.redux';
import SongEditList from '../../components/songs-edit-list/songs-edit-list';
import { HOST } from "../../const/host";

@connect(
    state=>state.publicSongs,
    { getSongs }
)
class StyleSongsListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    componentDidMount(){

        //请求风格歌单内的单曲
        let url = `${HOST}/mock/discovery/style/styleSongListDetail${this.props.location.state.id}.json`;
        this.props.getSongs(url)

    }
    render() {
        return (
            <div id="style-songs-list-detail">
                <YellowHeader title={`${this.props.location.state.name}`}/>
                {
                    this.props.songs?
                        <SongEditList allowCollect={true} option={false} data={this.props.songs} style={{"position":"fixed","top":"40px","left":"0"}} listStyle={{"marginTop":"90px"}} />
                        :
                        ""
                }
            </div>
        )
    }
}

export default StyleSongsListDetail