import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './containers/container/container';
import MusicPlayer from './components/music-plpayer/music-player'
import Tabbar from './components/top-tabbar/top-tabbar';

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        console.log(window.location.pathname)

    }
    render() {
        const TabbarRender= ()=> {
            switch (window.location.pathname){
                case `/`:
                    return <Tabbar></Tabbar>
                case `/repertoire`:
                    return <Tabbar></Tabbar>
                case `/me`:
                    return <Tabbar></Tabbar>
                case `/discover`:
                    return <Tabbar></Tabbar>
            }
            return null
        };

        const MusicPlayerRender= ()=> {
            switch (window.location.pathname){
                case `/`:
                    return <MusicPlayer></MusicPlayer>
                case `/repertoire`:
                    return <MusicPlayer></MusicPlayer>
                case `/me`:
                    return <MusicPlayer></MusicPlayer>
                case `/discover`:
                    return <MusicPlayer></MusicPlayer>
                case `/playdetail`:
                    return <MusicPlayer></MusicPlayer>
            }
            return null
        };

        return (
                <BrowserRouter>
                    <div>
                        <TabbarRender></TabbarRender>

                            <Route path="/" component={Container}></Route>
                            {/*<Route path="/playdetail" component={PlayDetail}></Route>*/}

                        <MusicPlayerRender></MusicPlayerRender>
                    </div>
                </BrowserRouter>
        )
    }
}
export default Router