const {Router} = require('express');
const {create, getAllLoans, getById, deletar, atualizar} = require('../controllers/loanController');

const router = Router();

router.post("/", create);
router.get("/", getAllLoans);
router.delete('/:id', deletar);
router.get('/:id', getById);
router.put('/:id', atualizar);


module.exports = router;