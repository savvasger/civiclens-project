require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 4000;
const { db }= require("./src/config/db");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function startServer() {
  try {
    await db.authenticate();
    await db.sync({ force: false });
  } catch (error) {
    console.error("Error occurred while connecting to the database:", error);
  }
}

startServer();
  