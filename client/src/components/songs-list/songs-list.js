import React, {Component} from 'react';
import './songs-list.less';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import Ball from '../ball/ball';
import { getCollectSongList } from '../../redux/personal.redux';
import CollectSongsPicker from '../../components/collect-songs-picker/collect-songs-picker';
import { addMusic,playThis } from '../../redux/player.redux';
import { fixedBody,looseBody } from '../../util/preventBackgroundScroll';
import axios from 'axios';
import { API } from '../../const/host'
@connect(
    state=>state,
    { addMusic,playThis,getCollectSongList }
)
class SongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickToCollect:false,
            songsList:"",
            terminalX:"",
            terminalY:"",
            originX:"",
            originY:"",
            balls:[]
        };
        this.addToList = this.addToList.bind(this);
        this.closeCollect = this.closeCollect.bind(this);
        this.complete = this.complete.bind(this);
    }
    //添加进播放列表
    addToList(i,data){
        let isExist = false;
        this.props.music.songs.map(v=>{
            if(data.src === v.src){
                isExist = true
            }
        });
        if(!isExist){
            this.props.addMusic(data);
            let ball = {
                id: `${i}`,
                terminalX:30,
                //由于使用antd-mobile的Tabs组件，导致获取起点终纵坐标不正确，这里计算了一下
                terminalY:window.location.pathname.indexOf("albumdetail")>0?document.getElementsByClassName('picture')[0].getBoundingClientRect().top+window.scrollY-213.5:document.getElementsByClassName('picture')[0].getBoundingClientRect().top,
                originX:document.getElementsByClassName('item-add')[i].getBoundingClientRect().left+10,
                originY:window.location.pathname.indexOf("albumdetail")>0?document.getElementsByClassName('item-add')[i].getBoundingClientRect().top+window.scrollY-213.5:document.getElementsByClassName('item-add')[i].getBoundingClientRect().top+10
            };
            console.log(window.scrollY);
            console.log(ball.originY,ball.terminalY)
            this.state.balls.push(ball);
            this.setState({},()=>{
                this.refs.ball.init()
            })
        }

    }
    complete(id){
        this.state.balls.forEach((v,i)=>{
            if(v.id === id){
                this.state.balls.splice(i,1);
                this.setState({});
                return
            }
        })
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
        axios.get(`${API}/mock/personal${sessionStorage.getItem("userId")}/collectSongList.json`).then(res=>{
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

    render() {
        return (
            <div id="songs-list">
                <QueueAnim delay={300} type="top">
                    {
                        this.props.songs.map((v,i)=>(
                            <div className={ v.src === this.props.music.currentSong.src? "songs-item current-played":"songs-item"} key={v.id} >
                                <div className="item-left" onClick={()=>{this.playThis(v)}}>
                                    <div className="item-title">{v.name}</div>
                                    <div className="item-artist">{v.artist}</div>
                                </div>
                                <div className="item-right">
                                    <div className="collect-song"  onClick={()=>{this.collectSong(v.id)}}>收藏</div>
                                    <div className="item-add" onClick={()=>{this.addToList(i,v)}}>
                                        +
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </QueueAnim>
                {
                    this.state.balls.map(v=>(
                        <Ball ref="ball"
                              key={v.id}
                              terminal={{x:v.terminalX,y:v.terminalY}}
                              origin={{x:v.originX,y:v.originY}}
                              id={v.id}
                              complete={this.complete}
                        />
                    ))
                }
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