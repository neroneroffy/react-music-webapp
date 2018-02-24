import React, {Component} from 'react';
import "./user-center.less";
import axios from 'axios';
import { API } from '../../const/host';
import WhiteSpace from '../../components/whiteSpace'
import { ImagePicker } from 'antd-mobile';
import YellowHeader from '../../components/yellow-header/yellow-header'
class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:"",
            newAvatar:""
        };
        //this.onChange = this.onChange.bind(this)
    };
    componentDidMount(){
        axios.get(`${API}/mock/personal${this.props.match.params.id}/userInfo.json`).then(response=>{
            let res = response.data;
            if(res.result){
                this.setState({
                    userInfo:res.data
                })
            }
        })
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            newAvatar: files
        });
    }
    render() {
        return (
            <div id="user-center">
                <YellowHeader title="修改资料" />
                {
                    this.state.userInfo?
                        <div className="user-center-wrapper">
                            <div className="avatar-upload">
                                <div className="top">
                                    <img src={this.state.userInfo.avatar} alt=""/>
                                </div>
                                <div className="bottom">
                                    <span>点击更换头像</span>
                                    <input type="file"/>
                                </div>
                            </div>
                            <WhiteSpace/>
                            <div className="base-info">
                                <div className="base-info-item">
                                    <span>昵称</span>
                                    <input type="text" value={this.state.userInfo.nickName}/>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                }

            </div>
        )
    }
}

export default UserCenter