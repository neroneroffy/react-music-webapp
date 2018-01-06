import React, {Component} from 'react';
import { Button } from 'antd-mobile'
import './index.less'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <Button type='primary'>按钮</Button>
                <div className="hello">hello</div>
            </div>
        )
    }
}
export default Index