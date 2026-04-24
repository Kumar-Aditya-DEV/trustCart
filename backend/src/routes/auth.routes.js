const express = require('express');
const router = express.Router();
const { register, login, getMe, googleLogin, ssoLogin } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Social / Identity Routes
router.post('/google', googleLogin);
router.post('/sso', ssoLogin);

module.exports = router;
