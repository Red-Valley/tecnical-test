const router = require('express').Router();

const userRouter = require('./user');
const roomRouter = require('./room');
const messagesRouter = require('./messages');

router.use('/user', userRouter);
router.use('/room', roomRouter);
router.use('/message', messagesRouter);

module.exports = router;
