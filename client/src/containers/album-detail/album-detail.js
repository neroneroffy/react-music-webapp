import React, {Component} from 'react';
import { Tabs } from 'antd-mobile';
import './album-detail.less';
import SongsList from '../../components/songs-list/songs-list';
import Header from '../../components/header/header';
import CommentList from '../../components/comment-list/comment-list';
import { getAlbumDetail } from '../../redux/album.redux';
import { getComment,clearCommect } from '../../redux/comment.redux';
import { connect } from 'react-redux';
@connect(
    state=>state,
    { getAlbumDetail,getComment,clearCommect }
)
class AlbumDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                { title: "全部歌曲" },
                { title: "简介" },
                { title: "评论" },
            ],
            pageNum:1
        };
        this.tabChange = this.tabChange.bind(this)
    }
    componentDidMount(){
        this.props.getAlbumDetail(this.props.match.params.id)
    }

    tabChange(tab,index){
        if(index === 2 && !this.props.comment.hasRequested){
            this.props.getComment(this.props.match.params.id,this.state.pageNum)
        }
    }
    componentWillUnmount(){
        this.props.clearCommect()
    }
    render() {
        const blur={
            background:`url(${this.props.album.detail.img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        };
        return (

            <div id="album-detail">
                {
                    this.props.album.detail?
                        <div>
                            <div className="album-detail-header">
                                <Header text="专辑"></Header>
                                <div className="a-h-center">
                                    <div className="a-h-left">
                                        <img src={this.props.album.detail.img} alt=""/>
                                    </div>
                                    <div className="a-h-right">
                                        <div className="title">{this.props.album.detail.name}</div>
                                        <div className="artist">{this.props.album.detail.artist}</div>
                                        <div className="date">发行于：{this.props.album.detail.date}</div>
                                    </div>
                                </div>
                                <div className="album-detail-header-blur" style={blur}></div>
                            </div>
                            <div className="album-content">
                                <Tabs tabs={this.state.tabs}
                                      initialPage={0}
                                      onChange={(tab,index) => { this.tabChange(tab,index); }}
                                      tabBarUnderlineStyle={{width:"25%",marginLeft:'4%'}}
                                >
                                    <SongsList songs={this.props.album.detail.songs}></SongsList>
                                    <div className="intro">
                                        {this.props.album.detail.introduction}
                                    </div>
                                    <div className="comment-wrapper">
                                        <CommentList data={this.props.comment.comment} />
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                        :
                        ""
                }
            </div>
        )
    }
}
export default AlbumDetail