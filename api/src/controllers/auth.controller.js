require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const isCreated = await User.findOne({email:req.body.email})
    if(isCreated)return res.status(400).json({message: "El usuario ya existe"})
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
      });
  
      //save user and respond
      await newUser.save();
      res.status(200).json({message: "Se registró el usuario"});
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(!user) return res.status(400).json({signUp: true})
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if(!validPassword)return res.status(400).json(({message: "wrong password"}))
  
      const token = jwt.sign({id: user.id} , process.env.SECRET_KEY, {expiresIn: '1d'})
  
      res.status(200).json({token, user})
    } catch (err) {
      res.status(500).json(err)
    }
}
  //VERIFICAR TOKEN

  const verifyToken = async(req, res, next) => {
    try {
      const {id} = jwt.verify(req.headers.token, process.env.SECRET_KEY)
      const isValid = await User.findById(id)
      if(isValid)return res.json({user:isValid})
      res.status(400).json("el token no es valido")
    } catch (error) {
      res.status(400).json(error)
    }
  }

module.exports= {
    register,
    login,
    verifyToken
}