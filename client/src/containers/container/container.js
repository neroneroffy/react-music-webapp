import React, {Component} from 'react';
import { Route,withRouter } from 'react-router-dom';
import Repertoire from '../repertoire/repertoire';
import Me from '../me/me';
import Discover from '../discover/discover';
import SongListDetail from '../song-list-detail/song-list-detail';
import AlbumDetail from '../album-detail/album-detail';
import CollectSongs from '../collect-songs/collect-songs';
import CollectSongList from '../collect-song-list/collect-song-list';
import Search from '../search/search';
import Ranking from '../ranking/ranking';
import RankingDetail from '../ranking-detail/ranking-detail';

import { setRoute } from '../../util/backTo'
@withRouter
class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        console.log(window.location.pathname)
        /*用正则匹配出来pathname*/
        if(this.props.location.pathname === '/'){
            this.props.history.push('/repertoire')
        }
    }
    componentWillUpdate(){
        setRoute(this.props.location.pathname)
    }
    render() {
        return (
            <div id="container">
                <Route path={`/repertoire`} component={Repertoire}/>
                <Route path={`/me`} component={Me}/>
                <Route path={`/discover`} component={Discover}/>
                <Route path={`/songlistdetail/:id`} component={SongListDetail}/>
                <Route path={`/albumdetail/:id`} component={AlbumDetail}/>
                <Route path={`/collectsongs`} component={CollectSongs}/>
                <Route path={`/collectsonglist/:id`} component={CollectSongList}/>
                <Route path={`/collectsonglistdetail/:id`} component={CollectSongs}/>
                <Route path={`/search`} component={Search}/>
                <Route path={`/ranking`} component={Ranking}/>
                <Route path={`/rankdetail/:data`} component={RankingDetail}/>
            </div>
        )
    }
}
export default Container