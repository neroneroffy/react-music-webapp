import React, {Component} from 'react';
import { Route,withRouter } from 'react-router-dom';
import Repertoire from '../repertoire/repertoire';
import Me from '../me/me';
import Discover from '../discover/discover';
import Tabbar from '../../components/top-tabbar/top-tabbar'
@withRouter
class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){
        if(window.location.pathname === '/index'){
            this.props.history.push('/index/repertoire')
        }
    }
    render() {
        const match = this.props.match;
        return (
            <div id="container">
                <Tabbar></Tabbar>
                <Route path={`${match.url}/repertoire`} component={Repertoire}></Route>
                <Route path={`${match.url}/me`} component={Me}></Route>
                <Route path={`${match.url}/discover`} component={Discover}></Route>
            </div>
        )
    }
}
export default Container