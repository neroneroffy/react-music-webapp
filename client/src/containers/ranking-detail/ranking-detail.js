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
        this.props.getRankDetail(this.props.match.params.id);
    }
    render() {
        return (
            <div id="ranking-detail">
                <Header text="榜单详情"/>
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
                        <SongList data={this.props.rankDetailList} option={false}/>
                        :
                        ""
                }

            </div>
        )
    }
}

export default ReactComponent