const {Router} = require('express');
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');

const router = Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);

module.exports = router;