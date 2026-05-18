
const express = require('express');
const router = express.Router();
const cors = require('cors');

const issueRoutes = require('./routes/issueRoutes');



const app = express();

const PORT = process.env.PORT
const HOST = process.env.HOST

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/issues", issueRoutes);


module.exports = app;