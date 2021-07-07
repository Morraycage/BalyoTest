require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8008;
const cors = require('cors');
const postsRoutes = require('./routes/posts');

app.use(cors());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

app.use("/", postsRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
