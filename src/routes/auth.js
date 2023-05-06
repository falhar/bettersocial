const router = require('express').Router();
const { registerMw } = require('../middlewares/auth');
const { uploadAvatarMw } = require('../middlewares/file');
const { registerValidatorMw } = require('../middlewares/validators/auth.validator');

router.post('/register', uploadAvatarMw, registerValidatorMw, registerMw);

module.exports = router;
