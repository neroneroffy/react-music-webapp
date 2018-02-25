import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fixedBody,looseBody } from '../../util/preventBackgroundScroll'
import './player.less';
import { playThis,playThisList } from '../../redux/player.redux';
import { stopPlay } from '../../redux/publicSongs.redux';
import { connect } from 'react-redux';
let rotateTimer = 0;
@connect(
    state=>state.publicSongs,
    { playThis,playThisList,stopPlay }
)

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaused:false,
            totalTime:"00:00",
            playedTime:"00:00",
            playPer:0,
            bufferedPer:0,
            playedLeft:0,
            detailPlayedLeft:0,
            volumnLeft:0,
            angle:0,
            mouseDown:false,
            musicListShow:false,
            currentMusic:{},
            isPlayed:false,
            playDetail:false,
            mode:"顺序"
        };
        this.last = this.last.bind(this);
        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
        this.playMode = this.playMode.bind(this);
        this.random = this.random.bind(this);
        this.startChangeTime = this.startChangeTime.bind(this);
        this.moveProgress = this.moveProgress.bind(this);
        this.moveVolume = this.moveVolume.bind(this);
        this.startMoveVolume = this.startMoveVolume.bind(this);
        this.clickChangeTime = this.clickChangeTime.bind(this);
        this.showMusicList = this.showMusicList.bind(this);
        this.delMusic = this.delMusic.bind(this);
        this.playDetail = this.playDetail.bind(this)
        this.hidePlayDetail = this.hidePlayDetail.bind(this)
        this.rotate = this.rotate.bind(this)
    }

    componentDidMount(){
        let audio = this.refs.audio;
        let played = this.refs.played;
        let totalVolume = this.refs.totalVolume;
        audio.addEventListener('canplay',()=>{
            //获取总时间
            let totalTime = parseInt(audio.duration);
            this.setState({
                totalTime:this.getTime(totalTime),
                playedLeft:played.getBoundingClientRect().left,
                volumnLeft:totalVolume.getBoundingClientRect().left
            });
        });


        //设置初始音量
        this.refs.volumeProgress.style.width = "50%";
        audio.volume = 0.5
    }
/*    componentWillUnmount(){
        let audio = this.refs.audio;
        audio.removeEventListener('canplay')
    }*/
    componentWillReceiveProps(nextProps){
        //当播放器当前没有播放歌曲时候，点击歌曲列表的某一首歌，开始播放
        if(nextProps.currentSong !== this.state.currentMusic && nextProps.currentSong !== undefined){
            this.refs.played.style.width = 0;
            this.refs.buffered.style.width =0;
            this.setState({
                currentMusic:nextProps.currentSong,
                angle:0
            },()=>{
                this.play()
            })
        }
/*        if(nextProps.play){
            console.log(nextProps)
            this.play()
        }*/


    }

    playMode(){
        switch (this.state.mode){
            case "顺序":
                this.setState({
                    mode:'随机'
                });
                return;
            case "随机":
                this.setState({
                    mode:'单曲'
                });
                return;
            case "单曲":
                this.setState({
                    mode:'顺序'
                });
                return;
        }

    }
    random(){
        this.refs.played.style.width = 0;
        this.refs.buffered.style.width = 0;
        if(this.props.info.length !== 0){
            let randomIndex = Math.ceil(Math.random()*this.props.info.length-1);
            this.setState({
                currentMusic:this.props.info[randomIndex],
                angle:0
            },()=>{
                this.play()
            })
        }

    }
    last(){

        let songs = [];
        if(this.props.play){
            songs = this.props.songs
        }else{
            songs = this.props.info
        }

        if(!this.state.currentMusic.src){
            return
        }
        let current = ""
        songs.forEach((v,i)=>{
            if (v.src === this.state.currentMusic.src){
                current = i
            }
        });

        //如果播放列表内就一首歌
        if(songs.length === 1){
            return
        }
        this.refs.played.style.width = 0;
        this.refs.buffered.style.width = 0;
        if(current>0){

            this.setState({
                currentMusic:songs[current-1],
                angle:0
            },()=>{
                this.play()
            })
        }else{
            this.setState({
                currentMusic:songs[songs.length-1]
            },()=>{
                this.play()
            })
        }

    }
    rotate(){
        if(this.state.playDetail){

        }
        rotateTimer = setInterval(()=>{
            this.setState({
                angle:this.state.angle+1
            },()=>{
                this.refs.musicAvatar.style.transform = `rotate(${this.state.angle}deg)`;
                if(this.state.playDetail){
                    this.refs.detailMusicImg.style.transform = `rotate(${this.state.angle}deg)`;
                }
            })
        },30)
    }
    play(){
        clearInterval(rotateTimer);
        let audio = this.refs.audio;
        if(audio.paused && this.state.currentMusic.src){
            this.props.playThis(this.state.currentMusic);
            audio.play();
            this.setState({
                isPaused:true,
                isPlayed:true
            },()=>{
                this.rotate()

            })
        }else{
            audio.pause()
            this.setState({
                isPaused:false
            },()=>{
                clearInterval(rotateTimer)
            })
        }

        audio.addEventListener('timeupdate',()=>{
            //设置播放进度条
            let playPer = audio.currentTime/audio.duration;
            this.refs.played.style.width = playPer*100+"%";
            //设置缓冲进度条
            let timeRages = audio.buffered;
            let bufferedTime = 0
            if(timeRages.length !== 0){
                bufferedTime = timeRages.end(timeRages.length-1);
            }
            let bufferedPer = bufferedTime/audio.duration;
            this.refs.buffered.style.width = bufferedPer*100+"%";
            //设置剩余时间
            let playedTime = parseInt(audio.currentTime);

            this.setState({
                playedTime:this.getTime(playedTime),
            });
            //播放完成后根据播放模式设置歌曲的顺序
            if(audio.ended){
                clearInterval(rotateTimer)
                if(this.props.play){
                    this.props.playThisList()
                }else{
                    if(this.state.mode === '顺序'){
                        this.next()
                    }else if(this.state.mode === '随机'){
                        this.random()
                    }else if(this.state.mode === '单曲'){
                        this.setState({
                            angle:0
                        });
                        this.play()
                    }
                }
            }
        });

    }
    next(){
        if(!this.state.currentMusic.src){
            return
        }

        let current = "";
        let songs = [];

        if(this.props.play){
            songs = this.props.songs
        }else{
            songs = this.props.info
        }

        songs.forEach((v,i)=>{
            if (v.src === this.state.currentMusic.src){
                current = i
            }
        });
        //如果播放列表内就一首歌
        if(songs.length === 1){
            console.log(`就一首歌`)
            return
        }
        this.refs.played.style.width = 0;
        this.refs.buffered.style.width = 0;
        if(current<songs.length-1){
            this.setState({
                currentMusic:songs[current+1],
                angle:0

            },()=>{
                this.play()
            })
        }else{
            this.setState({
                currentMusic:songs[0],
                angle:0
            },()=>{
                this.play()
            })
        }

    }
    //点击设置进度条
    setTimeOnPc(e,flag){
        let audio = this.refs.audio;
        if(audio.currentTime !== 0) {
            let audio = this.refs.audio;
            let targetPoint = 0;
            let newWidth = 0;
            if(flag){

                targetPoint = e.pageX - this.state.detailPlayedLeft
                newWidth = targetPoint / this.refs.detailProgress.offsetWidth;

            }else{
                targetPoint = e.pageX - this.state.playedLeft;
                newWidth = targetPoint / this.refs.progress.offsetWidth;
            }

            this.refs.played.style.width = newWidth * 100 + "%";
            audio.currentTime = newWidth * audio.duration;
        }

    }
    //
    clickChangeTime(e,flag){
        if(!e.pageX){
            return
        }
        this.setTimeOnPc(e,flag)
    }
    //滑动设置进度条
    startChangeTime(e,flag){
        if(this.refs.audio.currentTime !== 0) {
            this.setTime(e,flag)
        }
    }
    moveProgress(e,flag){

        let audio = this.refs.audio;
        if(audio.currentTime !== 0){
            this.setTime(e,flag)
        }
    }
    getTime(musicTime){
        if(musicTime){
            if(musicTime<60){
                musicTime = `00:${musicTime<10?`0${musicTime}`:musicTime}`
            }else{
                musicTime = `${parseInt(musicTime/60)<10?`0${parseInt(musicTime/60)}`:parseInt(musicTime/60)}:${musicTime%60<10?`0${musicTime%60}`:musicTime%60}`
            }
            return musicTime

        }else{
            return `00:00`
        }
    }
    setTime(e,flag){
        let audio = this.refs.audio;
        let targetPoint = e.touches[0].pageX-this.state.playedLeft
        if(flag){
            targetPoint = e.touches[0].pageX- this.state.detailPlayedLeft
            var newWidth = targetPoint/this.refs.detailProgress.offsetWidth;
        }else{
            var newWidth = targetPoint/this.refs.progress.offsetWidth;
        }

        this.refs.played.style.width = newWidth*100 + "%";
        audio.currentTime = newWidth*audio.duration
    }
    /*移动端改变音量*/
    setVolume(pageX){
        let audio = this.refs.audio
        let volumeRate = (pageX-this.state.volumnLeft)/this.refs.totalVolume.offsetWidth;
        if(volumeRate>0.01 && volumeRate<=1){
            audio.volume = volumeRate
            this.refs.volumeProgress.style.width = volumeRate*100 + "%";
        }else if(volumeRate<=0.01){
            audio.volume = 0
        }else{
            audio.volume = 1
        }
    }
    startMoveVolume(e){
        if(this.refs.audio.currentTime !== 0) {
            this.setVolume(e.touches[0].pageX)
        }
    }
    moveVolume(e){
        if(this.refs.audio.currentTime !== 0) {
            this.setVolume(e.touches[0].pageX)
        }
    }
    //PC端改变音量
    clickChangeVolume(e){
        if(this.refs.audio.currentTime !== 0){
            this.setVolume(e.pageX)
        }
    }

    //展开播放列表
    showMusicList(){
        this.setState({
            musicListShow:!this.state.musicListShow
        },()=>{
            if(this.state.musicListShow){
                fixedBody();//阻止滚动穿透
            }else {
                looseBody();//释放滚动穿透
            }

        })
    }
    playThis(i){
        this.props.stopPlay();
        this.setState({
            currentMusic:this.props.info[i]
        },()=>{
            this.play()
        })
    }
    delMusic(i,id){

        this.setState({})
        if(this.props.info[i].src === this.state.currentMusic.src){
            //只有一首歌，播放后删除，删除后停止播放；
            if(this.props.info.length === 1){
               this.props.onDel(this.props.info[i].id);
                clearInterval(rotateTimer);
                this.setState({
                    currentMusic:{},
                    totalTime:"00:00"
                },()=>{
                    this.refs.played.style.width =0
                    this.refs.buffered.style.width =0
                });
                return
            }
            //播放的为最后一首，删除后播放第一首；
            if(i === this.props.info.length-1){
                this.props.onDel(this.props.info[i].id);
                clearInterval(rotateTimer);
                this.setState({
                    currentMusic:this.props.info[0]
                },()=>{
                    this.play();
                    return
                })
            }
            //删除的不是唯一一首也不是最后一首，删除后正常播放下一首歌曲
            if(i < this.props.info.length-1){
                this.props.onDel(this.props.info[i].id);
                clearInterval(rotateTimer);
                this.setState({
                    currentMusic:this.props.info[i]
                },()=>{
                    this.play();
                    return
                })
            }
        }else{
            //删除的不是播放的：直接删除
            this.props.onDel(this.props.info[i ].id);
        }

    }

    //展示播放详情页
    playDetail(){

        this.setState({
            playDetail:true,
        },()=>{
            fixedBody();//阻止滚动穿透
            this.refs.detailMusicImg.style.transform = `rotate(${this.state.angle}deg)`;//展开播放详情页的时候，设置图片转动角度与底部播放器封面图片角度相同
            this.setState({
                detailPlayedLeft:this.refs.detailPlayed.getBoundingClientRect().left
            })
        })
    }
    hidePlayDetail(){
        this.setState({
            playDetail:false
        },()=>{
            looseBody();//释放滚动穿透
        })
    }
    render() {
        return (
            <div id="react-music-player">
                <div className="react-music-player-wrapper">
                    <div className="react-music-player-inner" >
                        <div className="left-control">
                            <span className="icon-last" onClick={this.last}></span>
                            <span className={this.state.isPaused && this.state.currentMusic.src?"icon-pause":"icon-play"} onClick={this.play}></span>
                            <span className="icon-next" onClick={this.next}></span>
                        </div>
                        <div className="music-box">

                            <div className="picture" onClick={this.playDetail}>
                                {
                                    this.state.currentMusic.src?
                                        <img src={this.state.currentMusic.img} ref="musicAvatar" alt="图片丢失了"/>
                                        :
                                        <img className="album-bg" src={require('./little.png')} alt=""/>
                                }

                            </div>
                            <div className="music-info">
                                <div className="music-name">
                                    {
                                        this.state.currentMusic.src?(`${this.state.currentMusic.artist}：${this.state.currentMusic.name}`):`等待播放`
                                    }

                                </div>
                                <div className="progress-wrapper" ref="progress"
                                     onTouchMove={this.moveProgress}
                                     onTouchStart={this.startChangeTime}
                                     onClick={this.clickChangeTime}
                                >
                                    <div className="progress" >
                                        <div className="progress-buffered" ref="buffered" ></div>
                                        <div className="progress-played" ref="played"></div>
                                    </div>
                                </div>
                                <div className="time">

                                    <div className="remain-time">{this.state.currentMusic.src?this.state.playedTime:`00:00`}</div>
                                    <span>/</span>
                                    <div className="total-time">{this.state.currentMusic.src?this.state.totalTime:`00:00`}</div>

                                </div>
                            </div>
                        </div>
                        <div className="music-list-btn">
                            <span className="icon-menu" onClick={this.showMusicList}></span>
                        </div>

                        <div className="right-control">
                            <div className="volume-control-wrapper"
                                 onTouchMove={this.moveVolume}
                                 onTouchStart={this.startMoveVolume}
                                 onClick={this.clickChangeVolume}
                            >
                                <div className="volume-control" ref="totalVolume">
                                    <div className="volume-progress" ref="volumeProgress"></div>
                                </div>

                            </div>
                            <span className="icon-volume"></span>
                        </div>
                        <audio src={this.state.currentMusic.src?this.state.currentMusic.src:""} ref = "audio"></audio>
                    </div>
                </div>

                {/*播放列表*/}
                <ReactCSSTransitionGroup
                    transitionName="music-list-show"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.musicListShow?
                            <div className="music-list">
                                <div className="music-list-title">
                                    <span>播放列表</span>
                                </div>
                                <div className="single-music-wrapper">
                                    {
                                        this.props.info.map((v,i)=>{
                                            return (
                                                <div className="single-music" style={
                                                    this.state.currentMusic.src === v.src && this.state.isPlayed?{background: "#fec501",color:"#fff"}:null} key={v.src}>
                                                    <div className="single-music-play">
                                                        <span className={this.state.currentMusic.src === v .src && this.state.isPlayed?"icon-playing":"icon-play"} onClick={this.playThis.bind(this,i)}></span>
                                                    </div>
                                                    <div className="single-music-name">{v.name}</div>
                                                    <div className="single-music-artist">{v.artist}</div>
                                                    <div className="single-music-del">
                                                        <span className="icon-del" onClick={()=>{this.delMusic(i,v.id)}}></span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            :
                            null
                    }

                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName="music-list-model"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.musicListShow?
                            <div className="modal" onClick={this.showMusicList}></div>
                            :null
                    }
                </ReactCSSTransitionGroup>
                {/*播放详情*/}
                <ReactCSSTransitionGroup
                    transitionName="play-detail-show"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.playDetail?
                            <div className="play-detail">
                                <div className="play-detail-wrapper">

                                    <div className="play-detail-img">
                                        <img className="album-bg" src={require('./album.png')} alt=""/>
                                        <img className="album-border" src={require('./album-border.png')} alt=""/>
                                        <div className="detailPic-wrapper">
                                            <img className="detailPic" ref="detailMusicImg" src={this.state.currentMusic.img} alt=""/>
                                        </div>


                                    </div>
                                    <div className="music-info">
                                        <div className="title">{this.state.currentMusic.name}</div>
                                        <div className="artist">{this.state.currentMusic.artist}</div>
                                    </div>
                                    <div className="detail-progress" ref="detailProgress"
                                         onTouchMove={(e)=>{this.moveProgress(e,"detail")}}
                                         onTouchStart={(e)=>{this.startChangeTime(e,"detail")}}
                                         onClick={(e)=>{this.clickChangeTime(e,"detail")}}
                                    >

                                        <div className="progress" >
                                            <div className="progress-buffered" style={{width:`${this.refs.buffered.style.width}`}} ></div>
                                            <div className="progress-played" ref="detailPlayed" style={{width:`${this.refs.played.style.width}`}}></div>
                                        </div>
                                    </div>
                                    <div className="detail-time">
                                        <div>{this.state.playedTime}</div>
                                        <div>{this.state.totalTime}</div>
                                    </div>
                                    <div className="operate">
                                        <div className="mode" onClick={this.playMode}>
                                            {this.state.mode}
                                        </div>
                                        <div className="operation">
                                            <span className="icon-last" onClick={this.last}></span>
                                            <span className={this.state.isPaused && this.state.currentMusic.src?"icon-pause":"icon-play"} onClick={this.play}></span>
                                            <span className="icon-next" onClick={this.next}></span>
                                        </div>
                                        <div className="close-detail" onClick={this.hidePlayDetail}>
                                            <img src={require('../../icons/close.png')} alt=""/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            :
                            ""

                    }
                </ReactCSSTransitionGroup>

            </div>
        )
    }
}
export default Player