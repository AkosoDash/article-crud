import { logoutAuthor } from "../../controllers/author.controller.js";
import {authorController} from "../../controllers/index.js";
import express from "express"
import cookieParser from "cookie-parser";
import { authorAuth } from "../../middleware/auth.js";
import { isAuthenticated } from '../../middleware/auth.js';


const {loginAuthor, registerAuthor, getAuthorById} = authorController

const authorRouter = express.Router();

authorRouter.post("/login", loginAuthor);
authorRouter.post("/register", registerAuthor);
authorRouter.get("/:id",cookieParser(), authorAuth, getAuthorById);
authorRouter.post("/logout", cookieParser(), isAuthenticated, logoutAuthor);

export default authorRouter;
