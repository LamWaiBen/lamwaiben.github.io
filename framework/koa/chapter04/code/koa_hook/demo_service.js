class DemoService{
    constructor(){

    }


    beforeSendMessageInvokeValidate(){
        return new Promise((resolve, reject) =>{
            console.log("DemoService beforeSendMessageInvokeValidate")
            resolve()
        })
    }

    beforeSendMessageCheckSign(){
        return new Promise((resolve, reject) =>{
            console.log("DemoService beforeSendMessageCheckSign")
            resolve()
        })
    }

    sendMessageCode(){
        return new Promise((resolve, reject) =>{
            console.log("DemoService sendMessageCode")
            resolve()
        })
    }
}


module.exports = new DemoService();