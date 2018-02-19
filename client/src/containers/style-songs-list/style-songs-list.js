import React, {Component} from 'react';
import './style-songs-list.less';
import YellowHeader from '../../components/yellow-header/yellow-header';
import { connect } from 'react-redux';
import { getStyleSongsList } from '../../redux/discovery.redux';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { HOST } from '../../const/host'

@connect(
    state=>state.discovery,
    { getStyleSongsList }
)
class StyleSongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleInfo:""
        }
    };
    componentDidMount(){
        this.setState({
            styleInfo:JSON.parse(sessionStorage.getItem("styleInfo"))
        },()=>{
            this.props.getStyleSongsList(this.state.styleInfo.id);
        });

    }
    render() {
        return (
            <div id="style-songs-list">
                <YellowHeader title={`${this.state.styleInfo.name}`}/>
                <div className="songs-list-wrapper">
                    {
                        this.props.styleSongsList?
                            <div className="style-songs-list-wrapper">
                                <QueueAnim delay={300} type="top">
                                    {
                                        this.props.styleSongsList.map(v=>(
                                                <div className="list-item" key={v.id}>
                                                    <Link to={{pathname:`${HOST}/style-songs-list-detail`,state:{id:v.id,name:v.name}}} className="left">
                                                        <div className="cover">
                                                            <img src={v.cover} alt=""/>
                                                        </div>
                                                        <div className="left-right">
                                                            <div className="title">{v.name}</div>
                                                            <div className="num">{v.num} 首歌曲</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        )
                                    }
                                </QueueAnim>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        )
    }
}

export default StyleSongsList