import  express  from "express";
import cors from "cors";
import db from "./app/models/index.js";
import router from "./app/routes/v1/index.js";
import cookieParser from "cookie-parser";
import { authorAuth } from "./app/middleware/auth.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)
app.use(cookieParser())

app.get("/", (req, res) => {
  res.json({ message: "Welcome To Simple CRUD Article ." });
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log("Can't connect to database", err);
        process.exit();
    })