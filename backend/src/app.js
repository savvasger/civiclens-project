const express = require('express');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/auth');

const validateSession = require('./middlewares/validate');



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/issues", validateSession, issueRoutes);


app.use(
  express.static(
    path.join(__dirname, "../../frontend/dist")
  )
);

app.use((req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../frontend/dist/index.html"
    )
  );
});

module.exports = app;