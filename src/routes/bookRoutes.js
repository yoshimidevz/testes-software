const {Router} = require('express');
const {create, get} = require('../controllers/bookController');

const router = Router();

router.post("/", create);
router.get("/", get);


module.exports = router;