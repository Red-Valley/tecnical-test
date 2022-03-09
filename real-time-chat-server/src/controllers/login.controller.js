const req = require('express/lib/request');
const UserModel = require('../models/user.model');

const Login = async (req,res) => {
    const params = req.body;
    if(params.user && params.password){
        const userData= await UserModel.findOne({username:params.user}).exec();
        if(!userData || userData==null){
            return res.status(400).send({
                status: 'error',
                message:'invalid credentials'
            });
        }
        if(params.user==userData.username && params.password==userData.password){
            return res.status(200).send({
                status: 'success',
                userData
            });
        }else{
            return res.status(400).send({
                status: 'error',
                message:'invalid credentials'
            });
        }
    }else{
        return res.status(400).send({
            status: 'error',
            message: 'incomplete data'
        });
    }
}


module.exports = Login;