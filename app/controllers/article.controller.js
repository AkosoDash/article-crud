import db from "../models/index.js";
const Article = db.articles;

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
    const article = await new Article({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        published: req.body.published
    })  

    try {
        article.save(article)
        res.status(200).send({
            data: article
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export const updateArticle = async (req, res) => {
    const {title, author, text, published} = req.body;
    
    if(!title){
        return res.send({
            message: "Field title tidak boleh kosong"
        })
    }
    if(!author){
        return res.send({
            message: "Field author tidak boleh kosong"
        })
    }
    if(!text){
        return res.send({
            message: "Field text tidak boleh kosong"
        })
    }
    if(!published){
        return res.send({
            message: "Field published tidak boleh kosong"
        })
    }
      
    try {
        const id = req.params.id
        const article = await Article.findByIdAndUpdate(id, req.body, {useAndModify: false})
        if (!article) {
            res.status(404).send({
                message: `Cannot update Article with id = ${id}. Maybe article was not found!`
            })
        } else {
            res.status(200).send({
                message: "Article was updated successfully"
            })
        }
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