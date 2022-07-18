require('./src/db/connection');
const dotenv = require('dotenv');
const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(path.resolve(__dirname, "./public")));
app.use(express.json());

app.use(userRoutes)

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
});