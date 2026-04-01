const {Router} = require('express');
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');
const loanRoutes = require('./loanRoutes');

const router = Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/loans', loanRoutes);

module.exports = router;