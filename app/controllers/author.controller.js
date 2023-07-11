import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Author = db.author;
const jwtSecret = '73cef8336a4b3d5e247e590e7ac3d8ad0eaebd8d99bf76c17070adbd78a8d6e02fc511';

export const loginAuthor = async(req, res) => {
    const {username, password} = req.body;
    try{
        const author = await Author.findOne({username});
        if (!author) {
            res.status(202).send({
                message: "User Not Found"
            })
        } else {
            bcrypt.compare(password, author.password).then(function (result){
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                      { id: author._id, username},
                      jwtSecret,
                      {
                        expiresIn: maxAge, // 3hrs in sec
                      }
                    );
                    res.cookie("jwt", token, {
                      httpOnly: true,
                      maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                      message: "User successfully Logged in",
                      token: token,
                      author: author._id,
                    });
                } else {
                    res.status(400).json({ message: "Login not succesful" });
                }
            })
        }
    }
    catch (err) {
        res.status(500).send({
        message:
            err.message
        });
    }
}

export const registerAuthor = async (req, res) => {
    const {username, password, email, telp} = req.body;

    bcrypt.hash(password, 10).then(async(hash) => {
        try{
            const author = await Author.findOne({username});
            if (author) {
                res.status(202).send({
                    message: "Username Registered",
                    data: author._id
                })
            } else {
                await Author.create({
                    username,
                    password: hash,
                    email,
                    telp
                })
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { username, email, telp },
                    jwtSecret,
                    {expiresIn: maxAge}
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.status(201).json({
                    message: "User successfully created",
                    token: token
                });

            }
        }
        catch (err) {
            res.status(500).send({
            message:
                err.message
            });
        }
    })
}

export const getAuthorById = (req, res) => {
    const id = req.params.id
    Author.findById(id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).json({ message: "Error Bang", error: err })
    })
}

export const logoutAuthor = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout successful' });
};  

export default {loginAuthor, registerAuthor, getAuthorById, logoutAuthor};