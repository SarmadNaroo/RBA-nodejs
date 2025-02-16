const express = require('express');
const { getMe, superadminOnly, organizationAdminOnly } = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/me', authenticate, getMe);
router.get('/superadmin', authenticate, authorize(['superadmin']), superadminOnly);
router.get('/organizationadmin', authenticate, authorize(['organizationadmin']), organizationAdminOnly);

module.exports = router;
