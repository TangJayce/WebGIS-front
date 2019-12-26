import axios from 'axios'
import qs from 'qs'

// let params = new URLSearchParams();
// params.append('user_name','admin');
// params.append('user_password','admin');

axios.defaults.timeout = 5000;  // 设置超时时间

// 设置请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对于请求错误做些什么
    return Promise.reject(error);
});

let http = {
    get: '',
    post: ''
};

http.get = (api, data) => {
    let params = qs.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.get(api,params).then((res)=>{
            if(res.status === 200 && res.data){
                resolve(res.data)
            }
        }).catch((err)=>{
            reject(err)
        })
    })
};

http.post = (api, data) => {
    let params = qs.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.post(api,params).then((res)=>{
            if(res.status === 200) {
                if (res.data.status === 'success') {
                    resolve(res.data)
                } else {
                    reject(res.data.msg)
                }
            }
        }).catch((err)=>{
            reject(err)
        })
    })
};
export default http