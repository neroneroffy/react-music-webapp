import React, {Component} from 'react';
import { getSummary } from '../../redux/personal.redux';
import { Icon } from 'antd-mobile';
import MySongList from '../../components/my-song-list/my-song-list';
import WhiteSpace from '../../components/whiteSpace';
import './me.less'
import { connect } from 'react-redux';
@connect(
    state=>state.personal,
    { getSummary }
)
class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:5
        }
    }
    componentDidMount(){
        this.props.getSummary(this.state.userId)
    }
    render() {

        return (
            <div id="me">
                {
                    this.props.summary?
                        <div className="me-wrapper">
                            <div className="personal">
                                <div className="left">
                                    <div className="avatar">
                                        <img src={this.props.summary.avatar} alt=""/>
                                    </div>
                                    <div className="nick-name">{this.props.summary.nickName}</div>
                                </div>
                                <div className="right">
                                    <Icon type="right"></Icon>
                                </div>
                            </div>
                            <div className="personal-item">
                                <div className="title">收藏的单曲</div>
                                <div className="right">
                                    <Icon type="right"></Icon>
                                </div>
                            </div>
                            <div className="personal-item">
                                <div className="title">收藏的歌单</div>
                                <div className="right">
                                    <Icon type="right"></Icon>
                                </div>
                            </div>
                            <div className="white-space"></div>
                            <div className="my-song-list">
                                <div className="top">
                                    <div className="left">我创建的歌单</div>
                                    <div className="right">
                                        <span>新建</span>
                                        <span>+</span>
                                    </div>
                                </div>
                                {
                                    this.props.summary.mySongList.length === 0?
                                        <div className="no-list">暂时没有歌单，快来创建吧~</div>
                                        :
                                        <MySongList data={this.props.summary.mySongList}/>
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