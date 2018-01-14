import React, {Component} from 'react';
import { connect } from 'react-redux';
import './comment-list.less';
@connect(
    state=>state.comment
)

class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div id="comment-list">
                {
                    this.props.data.map(v=>(
                        <div className="comment-item" key={v.content}>
                            <div className="item-top">
                                <div className="comment-user">
                                    <div className="comment-avatar">
                                        <img src={v.avatar} alt=""/>
                                    </div>
                                    <div className="comment-nick-name">
                                        {v.nickName}
                                    </div>
                                </div>
                                <div className="create-time">
                                    {v.createDate}
                                </div>
                            </div>
                            <div className="item-content">
                                {v.content}
                            </div>
                        </div>
                    ))
                }
                <div className="text">
                    没有更多数据
                </div>
            </div>
        )
    }
}
export default CommentList