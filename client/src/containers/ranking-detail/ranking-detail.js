import React, {Component} from 'react';
import './ranking-detail.less';
import { Icon,Picker } from 'antd-mobile';
import { connect } from 'react-redux';
import { getRankDetail,getRankDetailList } from '../../redux/discovery.redux';
import SongList from '../../components/songs-edit-list/songs-edit-list';
import Header from '../../components/header/header'
@connect(
    state=>state.discovery,
    { getRankDetail,getRankDetailList }
)
class ReactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    componentDidMount(){
       let data = JSON.parse(this.props.match.params.data)
        this.props.getRankDetail(data.id);
        console.log(data)
    }
    render() {
        return (
            <div id="ranking-detail">
                <Header text={`${JSON.parse(this.props.match.params.data).rankName}`}/>
                {
                    this.props.rankDetail?
                        <div className="ranking-header">
                            <img src={this.props.rankDetail.cover} alt=""/>
                        </div>
                        :
                        ""
                }
                {
                    this.props.rankDetailList?
                        <SongList data={this.props.rankDetailList} order={true} style={{"position":"sticky","top":"40px","left":"0"}} option={false}/>
                        :
                        ""
                }

            </div>
        )
    }
}

export default ReactComponent