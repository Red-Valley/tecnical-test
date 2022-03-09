const UserModel = require('../models/user.model');

const User={
    create:async(req,res) => {
        params=req.body;
        if(!params.username || !params.password || !params.fullName || !params.nickname){
            return res.status(403).send({
                status:'error',
                message: 'Incomplete data'
            })
        }
        const newUser= new UserModel({
            username:params.username,
            password:params.password,
            fullName:params.fullName,
            nickname:params.nickname
        });
        const userData = await newUser.save();
        return res.status(200).send({
            status: 'success',
            userData
        });
    }
}

module.exports = User;