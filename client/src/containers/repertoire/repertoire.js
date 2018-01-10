import React, {Component} from 'react';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import {fetchBanner} from '../../redux/repertoire.redux';
import { connect } from 'react-redux';
import './repertoire.less';
@connect(
    state=>state,
    {fetchBanner}
)
class Repertoire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        this.props.fetchBanner()
    }
    render() {
        return (
            <div id="repertoire">
                Repertoire
            </div>
        )
    }
}
export default Repertoire