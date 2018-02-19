import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd-mobile';
import WhiteSpace from '../../components/whiteSpace';
import Title from '../../components/title';
import SongsList from '../../components/songs-list/songs-list';
import {fetchBanner,fetchRecommend,fetchReSongsData} from '../../redux/repertoire.redux';
import { connect } from 'react-redux';
import './repertoire.less';
import {HOST} from '../../const/host'
@connect(
    state=>state.repertoire,
    {fetchBanner,fetchRecommend,fetchReSongsData}
)
class Repertoire extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    componentDidMount(){
        this.props.fetchBanner();
        this.props.fetchRecommend();
        this.props.fetchReSongsData()
    }

    render() {
        return (
            <div id="repertoire">
                <div className="banner">
                    {
                        this.props.bannerData?
                            <Carousel
                                autoplay={true}
                                infinite
                                selectedIndex={1}
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => console.log('slide to', index)}
                            >
                                {this.props.bannerData.map(val => (
                                    <Link
                                        key={val}
                                        to={`${HOST}/albumdetail/3`}
                                        style={{ display: 'inline-block', width: '100%'}}
                                    >
                                        <img
                                            src={val}
                                            alt=""
                                            className="banner-img"
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </Link>
                                ))}
                            </Carousel>
                            :
                            ""
                    }

                </div>
                <WhiteSpace></WhiteSpace>
                <Title title="每日推荐"></Title>
                <div className="recommend">
                    {
                        this.props.recommendData?
                            <div className="recommend-wrapper">
                                {
                                    this.props.recommendData.map(v=>(
                                        <Link to={`${HOST}/songlistdetail/${v.id}`} key={v.src} className="recommend-item">
                                            <div>
                                                <img src={v.src} alt=""/>
                                            </div>
                                            <div className="item-name">{v.name}</div>
                                        </Link>
                                    ))
                                }
                            </div>
                            :
                            ""
                    }
                </div>
                <WhiteSpace></WhiteSpace>

                <Title title="曲库好歌"></Title>
                {
                    this.props.reSongsData?
                        <SongsList songs={this.props.reSongsData}></SongsList>
                        :
                        ""
                }


            </div>
        )
    }
}
export default Repertoire