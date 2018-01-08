import React, {Component} from 'react';
import Player from '../player/player';
import { connect } from 'react-redux';
import { getMusic } from '../../redux/player.redux';

@connect(
    state=>state,
    { getMusic }
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
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){

        if(nextProps.music.songs !== this.state.music){
            this.setState({
                music:nextProps.music.songs
            })
        }

    }
    delSong(i,id){
        console.log(id)
        //this.state.songInfo.splice(i,1)

    }
    render() {
        console.log(this.state.music);
        return (
            <div id="music-player">
                {
                    this.props.music.songs?
                        <Player
                            info={this.state.music}
                            onDel = {this.delSong}
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