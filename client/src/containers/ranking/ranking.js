import React, {Component} from 'react';
import "./ranking.less";
import YellowHeader from '../../components/yellow-header/yellow-header';
import { getRankList } from '../../redux/discovery.redux';
import { connect } from 'react-redux';
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
                <div className="ranking-wrapper">

                </div>
            </div>
        )
    }
}

export default Ranking