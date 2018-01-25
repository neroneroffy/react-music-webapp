import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addMusic,playThis } from '../../redux/player.redux';
import './song-edit-list.less'

@connect(
    state=>state,
    { addMusic,playThis }
)
class SongEditList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit:false
        };
        this.edit = this.edit.bind(this);
        this.done = this.done.bind(this)

    }
    edit(){
        this.setState({
            edit:true
        })
    }
    done(){
        this.setState({
            edit:false
        })
    }
    //点击播放歌曲
    playThis(data){
        this.props.playThis(data)
    }
    //添加进播放列表
    addToList(data){
        let isExist = false
        this.props.music.songs.map(v=>{
            if(data.src === v.src){
                isExist = true
            }
        })
        if(!isExist){
            this.props.addMusic(data)
        }
    }


    render() {
        return (
            <div id="edit-list">
                <div className="option">
                    <div className="search">搜索</div>
                    {
                        !this.state.edit?
                            <div className="edit" onClick={this.edit}>编辑</div>
                            :
                            ""
                    }

                    {
                        this.state.edit?
                            <div className="operate">
                                <div className="remove">移除</div>
                                <div className="done" onClick={this.done}>完成</div>
                            </div>
                            :
                            ""
                    }
                </div>
                {/*内容*/}
                <div className="song-edit-list">
                    {
                        this.props.data.map(v=>(
                            <div className="single-song" key={v.src}>
                                <div className="left">
                                    {
                                        this.state.edit?
                                            <div className="select"><div></div></div>
                                            :
                                            ""
                                    }
                                    <div className="songs-info" onClick={()=>{this.playThis(v)}}>
                                        <div className="name">{v.name}</div>
                                        <div className="artist">{v.artist}</div>
                                    </div>
                                </div>
                                <div className="right" onClick={()=>{this.addToList(v)}}>
                                    +
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>

        )
    }
}
export default SongEditList