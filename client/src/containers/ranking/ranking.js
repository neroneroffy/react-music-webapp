import React, {Component} from 'react';
import "./ranking.less";
import YellowHeader from '../../components/yellow-header/yellow-header';
import { Link } from 'react-router-dom';
import { getRankList } from '../../redux/discovery.redux';
import { connect } from 'react-redux';
import {HOST} from '../../const/host'
@connect(
    state=>state.discovery,
    { getRankList }
)
class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    componentDidMount(){
        this.props.getRankList()
    }
    render() {
        return (
            <div id="ranking">
                <YellowHeader title="排行榜" />
                    {
                        this.props.rankList?
                            <div className="ranking-wrapper">
                                {
                                    this.props.rankList.map(v=>(
                                        <Link to={{pathname:`${HOST}/rankdetail`,state:{id:v.id,name:v.name}}} className="rank-item" key={v.id}>
                                            <div className="left">
                                                <img src={v.cover} alt="图片丢失了，呜呜呜"/>
                                            </div>
                                            <div className="right">
                                                <div className="title">{v.name}</div>
                                                <div className="des">{v.desc}</div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            :
                            ""
                    }
            </div>
        )
    }
}

export default Ranking