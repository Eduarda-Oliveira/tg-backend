const router = require("express").Router();
const {ClientController} = require("../controllers");
const {create, login} = new ClientController();

// curl -X POST -d  http://localhost:9001/client/create
router.post("/create", create);
// curl -X GET -d  http://localhost:9001/client/login
router.get("/login", login);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida com o usuário']});
})

module.exports = router;