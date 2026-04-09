const {Router} = require('express');
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');
const loanRoutes = require('./loanRoutes');
const fineRoutes = require('./fineRoutes');

const router = Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/loans', loanRoutes);
router.use('/fines', fineRoutes);

module.exports = router;