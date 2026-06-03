const wpService = require('../services/wpService');

const postController = {
    // Controller for fetching the latest posts
    getLatestPosts: async (req, res) => {
        try {
            // We can even allow the frontend to specify the count via query params
            // e.g., /api/posts/latest?limit=10
            const limit = parseInt(req.query.limit) || 5;

            const posts = await wpService.getLatestPosts(limit);

            // Send the clean data back to Next.js
            res.status(200).json({
                success: true,
                data: posts
            });
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve posts from CMS'
            });
        }
    },

    getHomeData: async (req, res) => {
        try {
            const homeData = await wpService.getHomepageData();
            res.status(200).json({
                success: true,
                data: homeData
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Homepage data fetch failed' });
        }
    },
    getPostDetail: async (req, res) => {
        try {
            const { slug } = req.params; // From /api/posts/:slug
            const post = await wpService.getPostBySlug(slug);

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: 'Article not found'
                });
            }

            res.status(200).json({
                success: true,
                data: post
            });
        } catch (error) {
            console.error('BFF Post Detail Error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },
    getAuthorDetail: async (req, res) => {
        try {
            const { slug } = req.params;
            const author = await wpService.getAuthorBySlug(slug);

            if (!author) {
                return res.status(404).json({ success: false, message: 'Author not found' });
            }

            res.status(200).json({
                success: true,
                data: author
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching author data' });
        }
    },
    getTagDetail: async (req, res) => {
        try {
            const { slug } = req.params;
            const tag = await wpService.getTagBySlug(slug);

            if (!tag) {
                return res.status(404).json({ success: false, message: 'Topic not found' });
            }

            res.status(200).json({
                success: true,
                data: tag
            });
        } catch (error) {
            console.error('BFF Tag Detail Error:', error);
            res.status(500).json({ success: false, message: 'Error fetching topic data' });
        }
    },
    getCategoryDetail: async (req, res) => {
        try {
            const { slug } = req.params;
            const categoryArticles = await wpService.getCategoryDetail(slug);

            if (!categoryArticles) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }

            res.status(200).json({
                success: true,
                data: categoryArticles
            });
        } catch (error) {
            console.error('BFF Tag Detail Error:', error);
            res.status(500).json({ success: false, message: 'Error fetching topic data' });
        }
    },
    getTopMenuData: async(req,res)=>{
        try {
            const topMenuItems = await wpService.getTopMenu();

            if (!topMenuItems) {
                return res.status(404).json({ success: false, message: 'top menu items' });
            }

            res.status(200).json({
                success: true,
                data: topMenuItems
            });
        } catch (error) {
            console.error('BFF Top Menu Detail Error:', error);
            res.status(500).json({ success: false, message: 'Error fetching top menu data' });
        }
    },
    getTopMenuPrimary: async(req,res)=>{
        try {
            const topMenuItems = await wpService.getTopMenuPrimary();

            if (!topMenuItems) {
                return res.status(404).json({ success: false, message: 'top primary menu items' });
            }

            res.status(200).json({
                success: true,
                data: topMenuItems
            });
        } catch (error) {
            console.error('BFF Top Menu Detail Error:', error);
            res.status(500).json({ success: false, message: 'Error fetching top menu data' });
        }
    },
    getTopMenuSecondary: async(req,res)=>{
        try {
            const topMenuItems = await wpService.getTopMenuSecondary();

            if (!topMenuItems) {
                return res.status(404).json({ success: false, message: 'top primary menu items' });
            }

            res.status(200).json({
                success: true,
                data: topMenuItems
            });
        } catch (error) {
            console.error('BFF Top Menu Detail Error:', error);
            res.status(500).json({ success: false, message: 'Error fetching top menu data' });
        }
    },
    getHomePageSection: async(req,res)=>{
      try {
            const topMenuItems = await wpService.getHomePageSectionData();

            if (!topMenuItems) {
                return res.status(404).json({ success: false, message: 'top menu items' });
            }

            res.status(200).json({
                success: true,
                data: topMenuItems
            });
        } catch (error) {
            console.error('BFF Top Menu Detail Error:', error);
            res.status(500).json({ success: false, message: 'Error fetching top menu data' });
        }  
    }
};

module.exports = postController;