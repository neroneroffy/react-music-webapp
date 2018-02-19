import React, {Component} from 'react';
import './ranking-detail.less';
import { connect } from 'react-redux';
import { getRankDetail } from '../../redux/discovery.redux';
import { getSongs } from '../../redux/publicSongs.redux';
import SongList from '../../components/songs-edit-list/songs-edit-list';
import Header from '../../components/header/header';
import { HOST } from "../../const/host";

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
       let data = this.props.location.state;
       this.props.getRankDetail(data.id);
       let url = `${HOST}/mock/discovery/ranking-detail${data.id}list1.json`
       this.props.getSongs(url)

    }
    render() {
        return (
            <div id="ranking-detail">
                <Header text={`${this.props.location.state.name}`}/>
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
                        <SongList data={this.props.publicSongs.songs} order={true} style={{"position":"sticky","top":"40px","left":"0"}} option={false} allowCollect={true}/>
                        :
                        ""
                }

            </div>
        )
    }
}

export default ReactComponent