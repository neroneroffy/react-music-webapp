import React, {Component} from 'react';
import YellowHeader from '../../components/yellow-header/yellow-header'
import { connect } from 'react-redux';
import './collect-song-list.less';
class CollectSongList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="collect-song-list">

            </div>
        )
    }
}
export default CollectSongList