import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Container from './containers/container/container';
import MusicPlayer from './components/music-plpayer/music-player'
import Tabbar from './components/top-tabbar/top-tabbar';
import {HOST} from './const/host'
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const TabbarRender= ()=> {
            switch (window.location.pathname){
                case `${HOST}/`:
                    return <Tabbar></Tabbar>
                case `${HOST}/repertoire`:
                    return <Tabbar></Tabbar>
                case `${HOST}/me`:
                    return <Tabbar></Tabbar>
                case `${HOST}/discover`:
                    return <Tabbar></Tabbar>
            }
            return null
        };

        const MusicPlayerRender= ()=> {
            switch (window.location.pathname){
                case `${HOST}/`:
                    return <MusicPlayer></MusicPlayer>
                case `${HOST}/repertoire`:
                    return <MusicPlayer></MusicPlayer>
                case `${HOST}/me`:
                    return <MusicPlayer></MusicPlayer>
                case `${HOST}/discover`:
                    return <MusicPlayer></MusicPlayer>
                case `${HOST}/playdetail`:
                    return <MusicPlayer></MusicPlayer>
            }
            return null
        };

        return (
                <BrowserRouter>
                    <div>
                        <TabbarRender></TabbarRender>
                        <Container></Container>
                           {/* <Route path="/" component={Container}></Route>*/}

                        <MusicPlayer></MusicPlayer>
                    </div>
                </BrowserRouter>
        )
    }
}
export default Router