import jwt from "jsonwebtoken"

const jwtSecret = "73cef8336a4b3d5e247e590e7ac3d8ad0eaebd8d99bf76c17070adbd78a8d6e02fc511";

export const authorAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        next()
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, jwtSecret, (err) => {
        if (err) {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).json({ message: 'Not authorized, token not available' });
    }
};