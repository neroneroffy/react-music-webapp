import React, {Component} from 'react';
import Player from '../player/player';
import { connect } from 'react-redux';
import { getMusic,delMusic } from '../../redux/player.redux';
import './music-player.less'
@connect(
    state=>state,
    { getMusic,delMusic }
)
class MusicPlayer extends Component {
    constructor(props){
        super(props)
        this.state={
            music:null
        };
        this.delSong = this.delSong.bind(this)
    }
    componentWillMount(){
        this.props.getMusic()
    }
    componentWillReceiveProps(nextProps){

        //设置播放列表
        if(nextProps.music !== this.state.music){
            this.setState({
                music:nextProps.music
            })
        }

    }
    delSong(id){

        this.props.delMusic(id)
        //this.state.songInfo.splice(i,1)

    }
    render() {
        return (
            <div id="music-player">


                {
                    this.props.music.shouldRender?
                        <Player
                            info={this.props.music.songs}
                            onDel = {this.delSong}
                            currentSong = {this.props.music.currentSong}
                        >
                        </Player>
                        :
                        ""
                }

            </div>
        )
    }
}
export default MusicPlayer