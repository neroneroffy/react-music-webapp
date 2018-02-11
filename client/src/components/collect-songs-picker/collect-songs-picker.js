import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button } from 'antd-mobile';
import axios from 'axios';
import "./collect-songs-picker.less"

class ReactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedValue:"000",
            songsList:""
        };
        this.closeCollect = this.closeCollect.bind(this);
        this.selectCollectOption = this.selectCollectOption.bind(this)
    };

    //关闭收藏弹出层
    closeCollect(){
        this.props.closeCollect()
    }
    selectCollectOption(){
        this.setState({
            checkedValue:"000"
        },()=>{
            this.props.closeCollect()
        })
    }
    selectCollectSongListOption(id){
        this.setState({
            checkedValue:id,
        },()=>{
            this.props.closeCollect()
        })
    }

    render() {
        return (
            <div id="collect-songs-picker">
                <ReactCSSTransitionGroup
                    transitionName="collect-model"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.props.show?
                            <div className="collect-model-inner" onClick={this.closeCollect}>

                            </div>
                            :
                            ""
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName="collect-slide"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.props.show?
                            <div className="collect-select">
                                <div className="collect-select-header">
                                    收藏歌曲到
                                </div>
                                <div className="body">
                                    <div className="select-item-wrapper">
                                        <div className={this.state.checkedValue === "000"?"select-item select-item-active":"select-item"}  onClick={this.selectCollectOption}>我收藏的单曲</div>
                                    </div>
                                    <div className="add-title">添加进我的歌单</div>
                                    <div className="collect-song-list">
                                        <div className="collect-song-list-inner">
                                            {
                                                this.props.data.map(v=>(
                                                    <div className="select-item-wrapper" key={v.id}>
                                                        <div className={this.state.checkedValue === v.id?"select-item select-item-active":"select-item"} onClick={()=>{this.selectCollectSongListOption(v.id)}}>{v.name}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="create-song-list">
                                            <div className="create-input">
                                                <div>创建歌单</div>
                                                <input type="text" placeholder="请输入歌单名称" />
                                            </div>
                                            <Button type="primary">确定</Button>
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

export default ReactComponent