import db from "../models/index.js";
import articleValidation from "../validation/article.validation.js";

const Article = db.articles;
const validator = articleValidation;

export const getArticleList = async(req, res) => {
    const {query} = req
    const {published} = query

    try {
        const article = await Article.find({published : published === 'true' ? true : false})
        res.status(200).send({
            data: article
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export const publishArticle = async (req, res) => {
    try {
        const {body} = req;
        const addedArticle = validator(body);
        const article = new Article({
            title: addedArticle.getTitle(),
            author: addedArticle.getAuthor(),
            text: addedArticle.getText(),
            published: addedArticle.getPublished()
        })

        await article.save(article)
        res.status(200).send({
            data: article
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const updateArticle = async (req, res) => {
    try {
        const {body} = req;
        const updateArticle = validator(body);
        const articleData = {
            title: updateArticle.getTitle(),
            author: updateArticle.getAuthor(),
            text: updateArticle.getText(),
            published: updateArticle.getPublished()
        }
        const id = req.params.id
        const article = await Article.findByIdAndUpdate(id, articleData, {useAndModify: false})
        
        if (!article) {
            return res.status(404).send({
                message: `Cannot update Article with id = ${id}. Maybe article was not found!`
            })
        } 
           
        res.status(200).send({
            message: "Article was updated successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Article."
        });
    }
}

export const deleteArticleById = async (req, res) => {
    const id = req.params.id

    try {
        const article = await Article.findByIdAndRemove(id)
        res.status(200).send({
            data: article
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export const getArticleById = async (req, res) => {
    
    const id = req.params.id
    try {
        const article = await Article.findById(id)
        res.status(200).send({
            data: article
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export default {getArticleList, publishArticle, updateArticle, deleteArticleById, getArticleById};