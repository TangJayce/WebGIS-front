import JsonP from 'jsonp'

export default class Axios {
    // 利用jsonp发送跨域请求
    // JsonP(url,options,function)
    static jsonp(options){
        return new Promise((resolve, reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function (error,response) {
                if(response.status === 'success'){
                    resolve(response); // 成功的返回数据
                }else {
                    reject(response.message); // 失败的返回数据
                }
            })
        })
    }
}