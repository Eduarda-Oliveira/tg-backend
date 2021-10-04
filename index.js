require("dotenv-safe").config();
const express = require('express');
const router = require('./src/routes');
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`rodando na porta ${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use( (req, res) => {
    res.status(400).json({error:['URL desconhecida']});
});