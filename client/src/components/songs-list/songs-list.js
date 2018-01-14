import React, {Component} from 'react';
import './songs-list.less';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { addMusic,playThis } from '../../redux/player.redux';
@connect(
    state=>state,
    { addMusic,playThis }
)
class SongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.addToList = this.addToList.bind(this)
    }
    addToList(data){
        this.props.music.songs.map(v=>{
            if(data.src === v.src){
                return
            }
        })
        this.props.addMusic(data)
    }
    playThis(data){
        this.props.playThis(data)
    }
    shouldComponentUpdate(nextProps){

        if (nextProps === this.props){
            return false
        }
        return true
    }
    render() {
        return (
            <div id="songs-list">
                <QueueAnim delay={300} type="top">
                    {
                        this.props.songs.map(v=>(
                            <div className={ v.src === this.props.music.currentSong.src? "songs-item current-played":"songs-item"} key={v.id} >
                                <div className="item-left" onClick={()=>{this.playThis(v)}}>
                                    <div className="item-title">{v.name}</div>
                                    <div className="item-artist">{v.artist}</div>
                                </div>
                                <div className="item-right">
                                    <div className="item-add" onClick={()=>{this.addToList(v)}}>
                                        <img src={require('../../icons/add.png')} alt=""/>
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </QueueAnim>
            </div>
        )
    }
}
export default SongsList