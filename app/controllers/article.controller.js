import db from "../models/index.js";
const Article = db.articles;

export const getArticleList = (req, res) => {
    const {query} = req
    const {published} = query

    

    Article.find({published : published === 'true' ? true : false})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).json({ message: "Error Bang", error: err })
    })
}

export const publishArticle = (req, res) => {
    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        published: req.body.published
    })  

    article
        .save(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
            });        
        })
}

export const updateArticle = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
      
    const id = req.params.id

    Article
        .findByIdAndUpdate(id, req.body, {useAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot update Article with id=${id}. Maybe Article was not found!`
                });
              } else res.send({ message: "Article was updated successfully." });
            })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Article."
            });        
        })
}

export const deleteArticleById = (req, res) => {
    const id = req.params.id

    Article.findByIdAndRemove(id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).json({ message: "Error Bang", error: err })
    })
}

export const getArticleById = (req, res) => {
    const id = req.params.id
    Article.findById(id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).json({ message: "Error Bang", error: err })
    })
}

export default {getArticleList, publishArticle, updateArticle, deleteArticleById, getArticleById};