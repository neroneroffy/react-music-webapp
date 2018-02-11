import React, {Component} from 'react';
import './songs-list.less';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { getCollectSongList } from '../../redux/personal.redux';
import CollectSongsPicker from '../../components/collect-songs-picker/collect-songs-picker';
import { addMusic,playThis } from '../../redux/player.redux';
import { fixedBody,looseBody } from '../../util/preventBackgroundScroll';
import axios from 'axios';
@connect(
    state=>state,
    { addMusic,playThis,getCollectSongList }
)
class SongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickToCollect:false,
            songsList:""
        };
        this.addToList = this.addToList.bind(this);
        this.closeCollect = this.closeCollect.bind(this);

    }
    //添加进播放列表
    addToList(data){
        let isExist = false;
        this.props.music.songs.map(v=>{
            if(data.src === v.src){
                isExist = true
            }
        });
        if(!isExist){
            this.props.addMusic(data)
        }
    }
    //点击播放歌曲
    playThis(data){
        this.props.playThis(data)
    }
    //收藏歌曲
    collectSong(id){
        if(this.props.doNotPicker){
            this.props.getCollectSongId(id)
            return
        }

        //请求收藏的歌单
        axios.get(`/mock/personal${sessionStorage.getItem("userId")}/collectSongList.json`).then(res=>{
            let data = res.data;
            if(data.result){
                this.setState({
                    songsList:data.data
                });
            }else{
                this.setState({
                    songsList:"0"
                })
            }
            this.setState({
                clickToCollect:true
            },()=>{
                fixedBody()
            })
        })
    }
    //关闭收藏弹出层
    closeCollect(){
        this.setState({
            clickToCollect:false
        },()=>{
            looseBody()
        })
    }

/*    shouldComponentUpdate(nextProps){
        if (nextProps === this.props){
            return false
        }
        return true
    }*/
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
                                    <div className="collect-song"  onClick={()=>{this.collectSong(v.id)}}>收藏</div>
                                    <div className="item-add" onClick={()=>{this.addToList(v)}}>
                                        +
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </QueueAnim>
                <CollectSongsPicker
                    show={this.state.clickToCollect}
                    data={this.state.songsList}
                    closeCollect={this.closeCollect}
                />
            </div>
        )
    }
}
export default SongsList