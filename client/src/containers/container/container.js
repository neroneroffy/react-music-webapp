import React, {Component} from 'react';
import { Route,withRouter } from 'react-router-dom';
import Repertoire from '../repertoire/repertoire';
import Me from '../me/me';
import Discover from '../discover/discover';
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
    render() {
        return (
            <div id="container">
                <Route path={`/repertoire`} component={Repertoire}></Route>
                <Route path={`/me`} component={Me}></Route>
                <Route path={`/discover`} component={Discover}></Route>
            </div>
        )
    }
}
export default Container