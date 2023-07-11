import  express  from "express";
import cors from "cors";
import db from "./app/models/index.js";
import router from "./app/routes/v1/index.js";
import cookieParser from "cookie-parser";

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

try {
  db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("Berhaisl terhubung dengan database")
} catch (error) {
  console.log(error)
}
