import React, {Component} from 'react';
import { getSummary } from '../../redux/personal.redux';
import { Icon,Modal } from 'antd-mobile';
import MySongList from '../../components/my-song-list/my-song-list';
import { Link } from 'react-router-dom';
import './me.less'
import { connect } from 'react-redux';
import {HOST} from '../../const/host'
const prompt = Modal.prompt;
@connect(
    state=>state.personal,
    { getSummary }
)
class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:""
        };
        this.newSongList = this.newSongList.bind(this)
    }
    componentDidMount(){
        this.setState({
            userId:sessionStorage.getItem('userId')
        },()=>{
            this.props.getSummary(this.state.userId)
        })

    }
    newSongList(){
        prompt(
            '新建歌单', '请输入歌单名称', [
                { text: '取消' },
                { text: '确定', onPress: value => console.log(`输入的内容:${value}`) },
            ]
        )}

    render() {
        return (
            <div id="me">
                {
                    this.props.summary?
                        <div className="me-wrapper">
                            <Link to={`${HOST}/user-center/${this.state.userId}`} className="personal">
                                <div className="left">
                                    <div className="avatar">
                                        <img src={this.props.summary.avatar} alt=""/>
                                    </div>
                                    <div className="nick-name">{this.props.summary.nickName}</div>
                                </div>
                                <div className="right">
                                    <span>修改资料</span>
                                    <Icon type="right"></Icon>
                                </div>
                            </Link>
                            <Link to={`${HOST}/collectsongs`} className="personal-item">
                                <div className="title">收藏的单曲</div>
                                <div className="right">
                                    <Icon type="right"></Icon>
                                </div>
                            </Link>
                            <Link to={`${HOST}/collectsonglist/${this.state.userId}`} className="personal-item">
                                <div className="title">收藏的歌单</div>
                                <div className="right">
                                    <Icon type="right"></Icon>
                                </div>
                            </Link>
                            <div className="white-space"></div>
                            <div className="my-song-list">
                                <div className="top">
                                    <div className="left">我创建的歌单</div>
                                    <div className="right" onClick={this.newSongList}>
                                        <span>新建</span>
                                        <span>+</span>
                                    </div>
                                </div>
                                {
                                    this.props.summary.mySongList.length === 0?
                                        <div className="no-list">暂时没有歌单，快来创建吧~</div>
                                        :
                                        <MySongList data={this.props.summary.mySongList} allowDelete={true}/>
                                }

                            </div>
                        </div>
                        :
                        ""
                }

            </div>
        )
    }
}
export default Me