const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/roletaController');

router.post('/', controller.reset);
// router.get('/', controller.get);
// router.put('/:id', controller.put);
// router.delete('/:id', controller.delete);

module.exports = router;
