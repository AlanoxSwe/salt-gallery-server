const router = require('express').Router();

const { imagesController } = require('../controllers');

router.route('/api/images/:category').get(imagesController);

module.exports = router;
