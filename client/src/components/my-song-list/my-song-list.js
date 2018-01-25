import React, {Component} from 'react';
import './my-song-list.less';
import QueueAnim from 'rc-queue-anim';
class MySongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
        }
    }
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    render() {
        return (
            <div id="my-song-list">
                <QueueAnim delay={300} type="top">
                {
                    this.props.data.map(v=>(
                        <div className="list-item" key={v.id}>
                            <div className="left">
                                <div className="cover">
                                    <img src={v.cover} alt=""/>
                                </div>
                                <div className="left-right">
                                    <div className="title">{v.name}</div>
                                    <div className="num">{v.num} 首歌曲</div>
                                </div>

                            </div>
                            <div className="right">
                                删除
                            </div>
                        </div>
                        )
                    )
                }
                </QueueAnim>
            </div>
        )
    }
}
export default MySongList