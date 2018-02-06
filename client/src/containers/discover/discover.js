import React, {Component} from 'react';
import './discover.less';
import {Carousel} from 'antd-mobile';
import Title from '../../components/title';
import WhiteSpace from '../../components/whiteSpace';
import { getDiscoveryData } from '../../redux/discovery.redux';
import { connect } from 'react-redux';
@connect(
    state=>state.discovery,
    { getDiscoveryData }
)
class Discover extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        this.props.getDiscoveryData()
    }

    render() {
        console.log(this.props)
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
                            {   this.props.data?
                                this.props.data.allListening.map(val => (
                                <div className="all-listening-item" key={val.id}>
                                    <div className="item-left">
                                        <img src={val.cover} alt=""/>
                                    </div>
                                    <div className="item-right">
                                        <div className="item-title">{val.title}</div>
                                        <div className="item-desc">{val.desc}</div>
                                    </div>
                                </div>
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
                                    <div className="style-item" key={v.id}>
                                        <div className="cover">
                                            <img src={v.cover} alt="图片丢失了！呜呜呜"/>
                                        </div>
                                        <div className="title">
                                            {v.name}
                                        </div>
                                    </div>
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