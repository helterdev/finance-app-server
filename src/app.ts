import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import auth from "./routes/auth.routes";
import google from "./routes/auth.google.routes";
import user from "./routes/auth.users.routes";
import accessenv from "./config";
import session from "express-session";
import passport from "./strategies/google";
import { isAuthenticated, logout } from "./middlewares/validateUser";

const app: express.Application = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

//express-session
app.use(
  session({
    secret: accessenv.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//routes//

//route auth whith username and password
app.use("/api/v1/auth", auth);
// route auth with google
app.use("/api/v1/auth", google);
//homecash router
app.use("/api/v1/auth", user);

export default app;
