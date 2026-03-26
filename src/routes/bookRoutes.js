const {Router} = require('express');
const {create, get, getById, deletar, atualizar} = require('../controllers/bookController');

const router = Router();

router.post("/", create);
router.get("/", get);
router.delete('/:id', deletar);
router.get('/:id', getById);
router.put('/:id', atualizar);


module.exports = router;