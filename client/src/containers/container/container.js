import React, {Component} from 'react';
import { Route,withRouter } from 'react-router-dom';
import Repertoire from '../repertoire/repertoire';
import Me from '../me/me';
import Discover from '../discover/discover';
import SongListDetail from '../song-list-detail/song-list-detail';
import AlbumDetail from '../album-detail/album-detail';
import CollectSongs from '../collect-songs/collect-songs';
import CollectSongList from '../collect-song-list/collect-song-list';

import { setRoute } from '../../util/backTo'
@withRouter
class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){
        /*用正则匹配出来pathname*/
        if(this.props.location.pathname === '/'){
            this.props.history.push('/repertoire')
        }
    }
    componentWillUpdate(){
        console.log(this.props)
        setRoute(this.props.location.pathname)
    }
    render() {
        return (
            <div id="container">
                <Route path={`/repertoire`} component={Repertoire}></Route>
                <Route path={`/me`} component={Me}></Route>
                <Route path={`/discover`} component={Discover}></Route>
                <Route path={`/songlistdetail/:id`} component={SongListDetail}></Route>
                <Route path={`/albumdetail/:id`} component={AlbumDetail}></Route>
                <Route path={`/collectsongs`} component={CollectSongs}></Route>
                <Route path={`/collectsonglist/:id`} component={CollectSongList}></Route>
                <Route path={`/collectsonglistdetail/:id`} component={CollectSongs}></Route>
            </div>
        )
    }
}
export default Container