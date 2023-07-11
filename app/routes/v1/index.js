import articleRoute from './article.routes.js'
import authorRoute from './author.routes.js';
import express from "express"

const router = express.Router();

router.use("/article", articleRoute)
router.use("/author", authorRoute)

export default router