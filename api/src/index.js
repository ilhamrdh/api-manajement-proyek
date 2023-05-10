import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./configs/connection.js";
import AuthRouter from "./routers/auth.js";
import UserRouter from "./routers/user.js";
import OrgRouter from "./routers/organization.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error handling
app.use((error, req, res, next) => {
    console.log(error.statusCode);
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
});

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/organization", OrgRouter);

// db.sync({ force: false })
//     .then(() => {
//         console.log("Database Connection");
//     })
//     .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});
