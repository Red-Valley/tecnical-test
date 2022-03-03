const router = require('express').Router();

const userRouter = require('./user');
const roomRouter = require('./room');

router.use('/user', userRouter);
router.use('/room', roomRouter);

module.exports = router;
