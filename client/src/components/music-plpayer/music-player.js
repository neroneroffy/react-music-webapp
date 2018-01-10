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

    componentWillReceiveProps(nextProps){

        if(nextProps.music !== this.state.music){

            this.setState({
                music:nextProps.music
            })
        }

    }
    delSong(i,id){
        console.log(id)
        //this.state.songInfo.splice(i,1)

    }
    render() {

        return (
            <div id="music-player">

                {
                    this.props.music.shouldRender?
                        <Player
                            info={this.state.music.songs}
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