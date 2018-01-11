import React, {Component} from 'react';
import './songs-list.less';
import { connect } from 'react-redux';
import { addMusic,playThis } from '../../redux/player.redux'
@connect(
    null,
    { addMusic,playThis }
)
class SongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.addToList = this.addToList.bind(this)
    }
    addToList(data){
        this.props.addMusic(data)
    }
    playThis(data){
        this.props.playThis(data)
    }
    render() {
        return (
            <div id="songs-list">
                {
                    this.props.songs.map(v=>(
                        <div className="songs-item" key={v.id}>
                            <div className="item-left" onClick={()=>{this.playThis(v)}}>
                                <div className="item-title">{v.name}</div>
                                <div className="item-artist">{v.artist}</div>
                            </div>
                            <div className="item-right">
                                <div className="item-add" onClick={()=>{this.addToList(v)}}>
                                    <img src={require('../../icons/add.png')} alt=""/>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        )
    }
}
export default SongsList