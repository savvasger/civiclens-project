
const express = require('express');
const router = express.Router();
const cors = require('cors');

const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/auth');
const sessionValidate = require('./middlewares/validate');



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/issues", sessionValidate, issueRoutes);



module.exports = app;