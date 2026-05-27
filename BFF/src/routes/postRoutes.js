const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');


router.get('/latest', postController.getLatestPosts);
router.get('/home', postController.getHomeData);
router.get('/detail/:slug', postController.getPostDetail);
router.get('/author/:slug', postController.getAuthorDetail);
router.get('/topic/:slug', postController.getTagDetail);
router.get('/category/:slug', postController.getCategoryDetail);
router.get('/topmenu/', postController.getTopMenuData);
router.get('/homepagesections/', postController.getHomePageSection);

module.exports = router;