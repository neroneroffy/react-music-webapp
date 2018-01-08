import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './containers/container/container';
import MusicPlayer from './components/music-plpayer/music-player'
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        if(window.location.pathname === '/'){
            window.location.pathname = '/index';
        }
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/index" component={Container}></Route>
                    </Switch>
                </BrowserRouter>
                <MusicPlayer></MusicPlayer>
            </div>
        )
    }
}
export default Router