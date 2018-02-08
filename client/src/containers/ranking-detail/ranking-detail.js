import React, {Component} from 'react';
import './ranking-detail.less';
import { Icon,Picker } from 'antd-mobile';
import { connect } from 'react-redux';
import { getRankDetail } from '../../redux/discovery.redux';
import { getSongs } from '../../redux/publicSongs.redux';
import SongList from '../../components/songs-edit-list/songs-edit-list';
import Header from '../../components/header/header'
@connect(
    state=>state,
    { getRankDetail,getSongs }
)
class ReactComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    componentDidMount(){
       let data = JSON.parse(this.props.match.params.data);
       this.props.getRankDetail(data.id);
       let url = `/mock/discovery/ranking-detail${data.id}list1.json`
       this.props.getSongs(url)

    }
    render() {
        return (
            <div id="ranking-detail">
                <Header text={`${JSON.parse(this.props.match.params.data).rankName}`}/>
                {
                    this.props.discovery.rankDetail?
                        <div className="ranking-header">
                            <img src={this.props.discovery.rankDetail.cover} alt=""/>
                        </div>
                        :
                        ""
                }
                {
                    this.props.publicSongs.songs?
                        <SongList data={this.props.publicSongs.songs} order={true} style={{"position":"sticky","top":"40px","left":"0"}} option={false}/>
                        :
                        ""
                }

            </div>
        )
    }
}

export default ReactComponent