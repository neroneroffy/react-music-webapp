/**
 * Created by haita on 2018/1/10 0010.
 */
import axios from 'axios';
import { Toast } from 'antd-mobile';
axios.interceptors.request.use((config)=>{
    Toast.loading('加载中',0);
    return config
});
axios.interceptors.response.use((config)=>{
    Toast.hide();
    return config
});