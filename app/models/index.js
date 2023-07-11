import dbConfig from "../config/db.config.js";
import mongoose from "mongoose";
import articleModel from "./article.model.js";
import authorModel from "./author.model.js";

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.articles = articleModel(mongoose);
db.author = authorModel(mongoose);

export default db;