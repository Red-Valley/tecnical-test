const router = require('express').Router();

const userRouter = require('./user');
const messagesRouter = require('./messages');

router.use('/user', userRouter);
router.use('/message', messagesRouter);

module.exports = router;
