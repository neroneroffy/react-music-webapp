import React, {Component} from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import './album-detail.less';
import SongsList from '../../components/songs-list/songs-list';
import Header from '../../components/header/header';
import CommentList from '../../components/comment-list/comment-list';
import { getAlbumDetail } from '../../redux/album.redux';
import { getComment,clearComment } from '../../redux/comment.redux';
import { connect } from 'react-redux';
function renderTabBar(props) {
    return (<Sticky topOffset={-150}>
        {({ style }) => <div style={{ ...style, top:150,zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
//let lastScrollY = 0;
@connect(
    state=>state,
    { getAlbumDetail,getComment,clearComment }
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
            pageNum:1,
            scaleStep:1
        };
        this.tabChange = this.tabChange.bind(this);
        this.albumScroll = this.albumScroll.bind(this)
    }
    componentDidMount(){
        this.props.getAlbumDetail(this.props.match.params.id);
        window.addEventListener('scroll', this.albumScroll);
    }
    albumScroll(){

        if(window.scrollY>2){

            this.refs.albumCover.style.position = "fixed";
            this.refs.albumCover.style.top = "-30px";
            this.refs.albumCover.style.zIndex = "2500";
            document.getElementsByClassName('am-tabs-content-wrap')[0].style.marginTop='130px'
/*            this.setState({
                scaleStep:this.state.scaleStep-0.02
            })*/

        }else{
/*            console.log(lastScrollY);
            if(lastScrollY-window.scrollY<0){
                this.setState({
                    scaleStep:this.state.scaleStep+0.02
                })
            }else{
                this.setState({
                    scaleStep:this.state.scaleStep-0.02
                })
            }
            lastScrollY = window.scrollY*/

            document.getElementsByClassName('am-tabs-content-wrap')[0].style.marginTop='0px'
            this.refs.albumCover.style.position = "relative";
            this.refs.albumCover.style.top = "0";


        }
        //this.refs.blurBg.style.transform = `scale(${this.state.scaleStep})`
    }
    tabChange(tab,index){

        if(index === 2 && !this.props.comment.hasRequested){
            this.props.getComment(this.props.match.params.id,this.state.pageNum)
        }
    }
    componentWillUnmount(){
        this.props.clearComment();
        window.removeEventListener('scroll', this.albumScroll);
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
                            <div className="album-detail-header" ref="albumCover">
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
                                <div className="album-detail-header-blur" ref="blurBg" style={blur}></div>
                            </div>
                            <StickyContainer className="album-content">
                                <Tabs tabs={this.state.tabs}
                                      initialPage={0}
                                      onChange={(tab,index) => { this.tabChange(tab,index); }}
                                      tabBarUnderlineStyle={{width:"25%",marginLeft:'4%'}}
                                      renderTabBar={renderTabBar}
                                >
                                    <SongsList songs={this.props.album.detail.songs}></SongsList>
                                    <div className="intro">
                                        {this.props.album.detail.introduction}
                                    </div>
                                    <div className="comment-wrapper">
                                        <CommentList data={this.props.comment.comment} />
                                    </div>
                                </Tabs>
                            </StickyContainer>
                        </div>
                        :
                        ""
                }
            </div>
        )
    }
}
export default AlbumDetail