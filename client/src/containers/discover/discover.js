import React, {Component} from 'react';
import './discover.less';
import {Carousel} from 'antd-mobile';
import Title from '../../components/title';
import WhiteSpace from '../../components/whiteSpace'
class Discover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[
                {
                    title:"Music",
                    desc:"MusicMusicMusicMusicMusic",
                    id:"1",
                    cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517922290457&di=8d06aa157d9caa5e156d01ce9025a1bf&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F02%2F25%2F145634808062643638.JPEG"
                },
                {
                    title:"Music2",
                    desc:"MusicMusicMusicMusicMusic",
                    id:"2",
                    cover:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1297105703,3175147722&fm=27&gp=0.jpg"
                },
                {
                    title:"Music3",
                    desc:"MusicMusicMusicMusicMusic",
                    id:"3",
                    cover:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404189816,2709240765&fm=27&gp=0.jpg"
                },
                {
                    title:"Music4",
                    desc:"MusicMusicMusicMusicMusic",
                    id:"4",
                    cover:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=302390327,216012538&fm=27&gp=0.jpg"
                }
            ],
            styleData:[
                {
                    name:"摇滚",
                    id:"1",
                    cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517921181972&di=b1252d151a0f1190697388fbcf3ba885&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20080804%2FImg258579351.jpg"
                },
                {
                    name:"爵士",
                    id:"2",
                    cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517920300579&di=44c52e0735611c66ea770b7a2aad09c8&imgtype=0&src=http%3A%2F%2Fimg21.mtime.cn%2Fmg%2F2010%2F10%2F08%2F102347.42954723.jpg"
                },
                {
                    name:"流行",
                    id:"3",
                    cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517920343628&di=c917da3dec9433e47dbff204306b56c5&imgtype=0&src=http%3A%2F%2Fimg0.pclady.com.cn%2Fpclady%2F1701%2F13%2F1656297_14.jpg"
                },
                {
                    name:"柔情",
                    id:"4",
                    cover:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=452589178,87996854&fm=27&gp=0.jpg"
                },
                {
                    name:"经典",
                    id:"5",
                    cover:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1601698238,3811500311&fm=27&gp=0.jpg"
                },
                {
                    name:"游戏",
                    id:"6",
                    cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517920503751&di=0d443dd4161d9ca2d856d22de6af0402&imgtype=0&src=http%3A%2F%2Fpc.yzz.cn%2Fpublic%2Fimages%2F100106%2F29_113431_1_lit.jpg"
                },
                {
                    name:"电影",
                    id:"7",
                    cover:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517920559370&di=e43e500344cbb8d8672e39592b5b0fc8&imgtype=0&src=http%3A%2F%2Fi2.sinaimg.cn%2Fgm%2F2014%2F0411%2FU3711P115DT20140411151723.jpg"
                },
            ]
        }
    }

    render() {
        return (
            <div id="discover">
                <div className="discover-wrapper">
                    <Title title="他们都在听"/>
                    <div className="all-listening">
                        <Carousel
                            autoplay={true}
                            infinite
                            selectedIndex={1}
                            dotStyle={{"display":"none"}}
                            dotActiveStyle={{"display":"none"}}
                        >
                            {this.state.data.map(val => (
                                <div className="all-listening-item" key={val.id}>
                                    <div className="item-left">
                                        <img src={val.cover} alt=""/>
                                    </div>
                                    <div className="item-right">
                                        <div className="item-title">{val.title}</div>
                                        <div className="item-desc">{val.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <WhiteSpace/>
                    <Title title="风格"/>
                    <div className="style">
                        {
                            this.state.styleData.map(v=>(
                                <div className="style-item" key={v.id}>
                                    <div className="cover">
                                        <img src={v.cover} alt="图片丢失了！呜呜呜"/>
                                    </div>
                                    <div className="title">
                                        {v.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Discover