require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model");

const userUpdate = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
        return res.status(500).json(err);
			}
		}
		try {
      const user = await userModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
			});
			res.status(200).json('Account has been updated');
		} catch (err) {
      return res.status(500).json(err);
		}
	} else {
    return res.status(403).json('You can update only your account!');
	}
} catch (error) {
  res.send(error) 
}
};

const userDelete = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  }

const userGet = async (req, res) => {
    const {userId, username} = req.query;
    try {
      if(!userId && !username){
        const {id} = jwt.verify(req.headers.token, process.env.SECRET_KEY)
        const users = await userModel.find({_id:{$ne:id}}, {password:0, updatedAt:0})
        return res.json(users)
      }
      const user = userId
        ? await userModel.findById(userId)
        : await userModel.findOne({ username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

const userFollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await userModel.findById(req.params.id);
        const currentUser = await userModel.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  }

module.exports = {
	userUpdate,
    userDelete,
    userGet,
    userFollow
};
