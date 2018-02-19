import React, {Component} from 'react';
import './discover.less';
import { Link } from 'react-router-dom';
import {Carousel,Icon} from 'antd-mobile';
import Title from '../../components/title';
import WhiteSpace from '../../components/whiteSpace';
import { getDiscoveryData } from '../../redux/discovery.redux';
import { connect } from 'react-redux';
import {HOST} from '../../const/host'
@connect(
    state=>state.discovery,
    { getDiscoveryData }
)
class Discover extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }
    componentDidMount(){
        this.props.getDiscoveryData()
    }
    storeInfo(id,name){
        let styleInfo={
            id,name
        };
        sessionStorage.setItem("styleInfo",JSON.stringify(styleInfo))
    }

    render() {
        return (
            <div id="discover">
                <div className="discover-wrapper">
                    <Link to={`${HOST}/search`} className="search-route">
                        <div className="search-inner">
                            <Icon type="search" size="sm" />
                            <div>输入歌曲名</div>
                        </div>
                    </Link>
                    <Title title="排行榜" linkTo={`${HOST}/ranking`}/>
                    <div className="all-listening">
                        <Carousel
                            autoplay={true}
                            infinite
                            selectedIndex={1}
                            dotStyle={{"display":"none"}}
                            dotActiveStyle={{"display":"none"}}
                        >
                            {
                                this.props.data?
                                this.props.data.ranking.map(val => (
                                <Link to={{pathname:`${HOST}/rankdetail`,state:{id:val.id,name:val.name}}} className="all-listening-item" key={val.id}>
                                    <div className="item-left">
                                        <img src={val.cover} alt=""/>
                                    </div>
                                    <div className="item-right">
                                        <div className="item-title">{val.name}</div>
                                        <div className="item-desc">{val.desc}</div>
                                    </div>
                                </Link>
                                ))
                                    :
                                ""
                            }
                        </Carousel>
                    </div>
                    <WhiteSpace/>
                    <Title title="风格"/>
                    <div className="style">
                        {
                            this.props.data?
                                this.props.data.style.map(v=>(
                                    <Link to={`${HOST}/style-songs-list`}  onClick={()=>{this.storeInfo(v.id,v.name)}}  className="style-item" key={v.id}>
                                        <div className="cover">
                                            <img src={v.cover} alt="图片丢失了！呜呜呜"/>
                                        </div>
                                        <div className="title">
                                            {v.name}
                                        </div>
                                    </Link>
                                ))
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Discover