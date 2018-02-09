import React, {Component} from 'react';
import './style-songs-list.less';
import YellowHeader from '../../components/yellow-header/yellow-header';
import { connect } from 'react-redux';
import { getStyleSongsList } from '../../redux/discovery.redux';
import MySongList from '../../components/my-song-list/my-song-list';
@connect(
    state=>state.discovery,
    { getStyleSongsList }
)
class StyleSongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };
    componentDidMount(){
        this.props.getStyleSongsList(this.props.location.state.id);
        console.log(this.props);
    }
    render() {
        return (
            <div id="style-songs-list">
                <YellowHeader title={`${this.props.location.state.name}`}/>
                <div className="songs-list-wrapper">
                    {
                        this.props.styleSongsList?
                            <MySongList data={this.props.styleSongsList}/>
                            :
                            ""
                    }
                </div>
            </div>
        )
    }
}

export default StyleSongsList