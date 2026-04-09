const {Router} = require('express');
const {create, getAllFines, getbyId, update, remove} = require('../controllers/fineController');

const router = Router();

router.post("/", create);
router.get("/", getAllFines);
router.delete('/:id', remove);
router.get('/:id', getbyId);
router.put('/:id', update);

module.exports = router;