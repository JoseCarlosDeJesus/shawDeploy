const express = require('express');
const router = express.Router();

const api = require('../controller/api-user-request');

router.get('/', api.requestUsersSince);
router.get('/:username', api.usernameDetails);
router.get('/:username/repos', api.userRepos);

module.exports = router;