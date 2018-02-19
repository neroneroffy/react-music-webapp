import React, {Component} from 'react';
import './search.less';
import YellowHeader from '../../components/yellow-header/yellow-header';
import SongsList from '../../components/songs-list/songs-list';
import { Icon } from 'antd-mobile';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result:[{
                "name":"等不到你",
                "artist":"夏天Alex",
                "src":"http://wma.5282.cc/2008-11//20160707/6.mp3",
                "img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515858245249&di=6a9bb9ec7223c83aa50a7ca23b732027&imgtype=0&src=http%3A%2F%2Fwww.hxw163.com%2Fuploadfile%2F2016%2F0806%2F20160806100520905.jpg",
                "id":"886545",
                "isCollected":false
            }]
        }
    };

    render() {
        return (
            <div id="search">
                <YellowHeader title="搜索" />
                <div className="search-input">
                    <input type="text"/>
                    <div className="search-btn">
                        <Icon type="search" size="sm" />
                    </div>
                </div>

                <SongsList songs={this.state.result}/>
                <div className="search-info">具体搜索功能需要后台，暂时放一个静态的搜索结果</div>
            </div>
        )
    }
}

export default Search