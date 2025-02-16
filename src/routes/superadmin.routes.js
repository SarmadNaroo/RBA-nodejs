const express = require('express');
const { createOrganizationAdmin } = require('../controllers/superadmin.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

const router = express.Router();

// Only superadmin can create organization users
router.post('/create-organization-user', authenticate, authorize(['superadmin']), createOrganizationAdmin);

module.exports = router;
