const {Router} = require('express');
const {getAllUsers, getById, create, atualizar, deletar} = require('../controllers/userController');

const router = Router();

router.post("/", create);
router.get("/", getAllUsers);
router.delete('/:id', deletar);
router.get('/:id', getById);
router.put('/:id', atualizar);

module.exports = router;