const {Router} = require('express');
const {create} = require('../controllers/bookController');

const router = Router();

router.post('/', create);

module.exports = router;