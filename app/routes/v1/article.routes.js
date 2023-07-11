import {articleController} from "../../controllers/index.js";
import express from "express"
import { authorAuth } from "../../middleware/auth.js";
import cookieParser from "cookie-parser";

const {getArticleById, publishArticle, updateArticle, deleteArticleById, getArticleList} = articleController

const articleRouter = express.Router();

articleRouter.get("/", cookieParser(),authorAuth, getArticleList);
articleRouter.post("/", cookieParser(),authorAuth, publishArticle);
articleRouter.put("/:id", cookieParser(),authorAuth, updateArticle);
articleRouter.delete("/:id", cookieParser(),authorAuth, deleteArticleById);
articleRouter.get("/:id", cookieParser(),authorAuth, getArticleById);

export default articleRouter;
