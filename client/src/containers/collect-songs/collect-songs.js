import React, {Component} from 'react';
import YellowHeader from '../../components/yellow-header/yellow-header'
import { connect } from 'react-redux';
import { getSongs } from '../../redux/publicSongs.redux';
import SongEditList from '../../components/songs-edit-list/songs-edit-list';
import { HOST } from "../../const/host";
import './collect-songs.less'

@connect(
    state=>state.publicSongs,
    { getSongs }
)
class CollectSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:"",
            isCustom:""
        };
    }
    componentDidMount(){

        this.setState({
            userId:sessionStorage.getItem('userId'),
            isCustom:JSON.parse(sessionStorage.getItem('isCustom'))
        },()=>{
            //请求收藏的单曲
            let url = `${HOST}/mock/personal${this.state.userId}/collectSongs.json`;
            //请求收藏的或者创建的歌单内的单曲
            if(this.props.match.params.id){
                //如果是用户自己创建的歌单，请求数据
                if(this.state.isCustom){
                    url = `${HOST}/mock/personal${this.state.userId}/songsInSongList${this.props.match.params.id}.json`;
                }else{
                    url = `${HOST}/mock/personal${this.state.userId}/notCustomSongsInSongList${this.props.match.params.id}.json`;
                }

            }
            this.props.getSongs(url)
        })

    }
    render() {

        return (
            <div id="collect-songs">
                <YellowHeader title={this.props.match.params.id?"歌单详情":"收藏的歌曲"}/>
                {
                    this.props.songs?
                        <SongEditList option={true} data={this.props.songs} style={{"position":"fixed","top":"40px","left":"0"}} listStyle={{"marginTop":"90px"}} />
                        :
                        ""
                }

            </div>
        )
    }
}
export default CollectSongs