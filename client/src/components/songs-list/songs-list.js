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
    //添加进播放列表
    addToList(data){
        let isExist = false;
        this.props.music.songs.map(v=>{
            if(data.src === v.src){
                isExist = true
            }
        })
        if(!isExist){
            this.props.addMusic(data)
        }
    }

    playThis(data){
        this.props.playThis(data)
    }
    //收藏歌曲
    collectSong(id){
        console.log(id);
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
                                    <div className="collect-song" onClick={()=>{this.collectSong(v.id)}}>收藏</div>
                                    <div className="item-add" onClick={()=>{this.addToList(v)}}>
                                        +
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