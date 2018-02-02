import React, {Component} from 'react';
import './my-song-list.less';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { Modal, Button } from 'antd-mobile';
import { delCollectSongList } from '../../redux/personal.redux';
import { connect } from 'react-redux';

@connect(
    state=>state,
    { delCollectSongList }
)
class MySongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
            userId:sessionStorage.getItem('userId')
        }
        this.deleteSongList = this.deleteSongList.bind(this)
    }
    deleteSongList(id){
        Modal.alert('确认删除歌单？', '歌单内的歌曲会一并删除', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                this.props.delCollectSongList(id,this.state.userId)
            } },
        ])
    }
/*    onSelect = (opt) => {
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
    }*/;

    render() {
        return (
            <div id="my-song-list">
                <QueueAnim delay={300} type="top">
                {
                    this.props.data.map(v=>(
                        <div className="list-item" key={v.id}>
                            <Link to={`/collectsonglistdetail/${v.id}`} className="left">
                                <div className="cover">
                                    <img src={v.cover} alt=""/>
                                </div>
                                <div className="left-right">
                                    <div className="title">{v.name}</div>
                                    <div className="num">{v.num} 首歌曲</div>
                                </div>

                            </Link>
                            <div className="right" onClick={()=>{this.deleteSongList(v.id)}}>
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