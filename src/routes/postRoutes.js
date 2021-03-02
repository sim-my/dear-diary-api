const express = require("express");

const router = express.Router();

const postController = require('../controllers/post');

router.get('/', postController.fetchAll) ;

router.get('/:id', postController.fetchOne) ;

router.post('/', postController.create) ;

router.delete('/:id', postController.delete) ;

module.exports = router;