const router = require("express").Router();
const {PhoneController} = require("../controllers");
const {create, login} = new PhoneController();

// curl -X POST -d  http://localhost:9001/phone/create
router.post("/create", create);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida com o usuário']});
})

module.exports = router;