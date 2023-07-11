import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authorValidation from "../validation/author.validation.js";

const loginValidator = authorValidation.authorLoginValidatorFunction;
const registerValidator = authorValidation.authorRegisterValidatorFunction;
const Author = db.author;
const jwtSecret = '73cef8336a4b3d5e247e590e7ac3d8ad0eaebd8d99bf76c17070adbd78a8d6e02fc511';

export const loginAuthor = async(req, res) => {
    try{
        const {body} = req;
        const registerData = loginValidator(body);
        const username = registerData.getUsername();
        const password = registerData.getPassword();
        const author = await Author.findOne({username});
        if (!author) {
            res.status(202).send({
                message: "User Not Found"
            })
        } else {
            try {
                const result = bcrypt.compare(password, author.password)
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
            } catch (error) {
                res.status(500).send({
                    message: error
                })
            }
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
    try {
        const {body} = req;
        const registerData = registerValidator(body);
        const username = registerData.getUsername();
        const password = registerData.getPassword();
        const telp = registerData.getTelp();
        const email = registerData.getEmail();
        const hash = await bcrypt.hash(password, 10)
        const author = await Author.findOne({username});

        if (!author) {
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
        } else {
            res.status(202).send({
                message: "Username Registered",
                data: author._id
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const getAuthorById = (req, res) => {
    const id = req.params.id
    const author = Author.findById(id)
    try {
        res.send({
            data: author
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
}

export const logoutAuthor = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logout successful' });
};  

export default {loginAuthor, registerAuthor, getAuthorById, logoutAuthor};