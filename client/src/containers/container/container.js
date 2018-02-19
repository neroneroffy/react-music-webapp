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
import StyleSongsList from '../style-songs-list/style-songs-list';
import StyleSongsListDetail from '../style-songs-list-detail/style-songs-list-detail';
import UserCenter from '../user-center/user-center';
import {HOST} from '../../const/host'
import { setRoute } from '../../util/backTo'
@withRouter
class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        /*用正则匹配出来pathname*/
        console.log(window.location.pathname);
        if(window.location.pathname === `${HOST}/`){
            this.props.history.push(`${HOST}/repertoire`)
        }
    }
    componentWillUpdate(){
        setRoute(this.props.location.pathname)
    }
    render() {
        return (
            <div id="container">
                <Route path={`${HOST}/repertoire`} component={Repertoire}/>
                <Route path={`${HOST}/me`} component={Me}/>
                <Route path={`${HOST}/discover`} component={Discover}/>
                <Route path={`${HOST}/songlistdetail/:id`} component={SongListDetail}/>
                <Route path={`${HOST}/albumdetail/:id`} component={AlbumDetail}/>
                <Route path={`${HOST}/collectsongs`} component={CollectSongs}/>
                <Route path={`${HOST}/collectsonglist/:id`} component={CollectSongList}/>
                <Route path={`${HOST}/collectsonglistdetail/:id`} component={CollectSongs}/>
                <Route path={`${HOST}/search`} component={Search}/>
                <Route path={`${HOST}/ranking`} component={Ranking}/>
                <Route path={`${HOST}/rankdetail`} component={RankingDetail}/>
                <Route path={`${HOST}/style-songs-list`} component={StyleSongsList}/>
                <Route path={`${HOST}/style-songs-list-detail`} component={StyleSongsListDetail}/>
                <Route path={`${HOST}/user-center/:id`} component={UserCenter}/>
            </div>
        )
    }
}
export default Container