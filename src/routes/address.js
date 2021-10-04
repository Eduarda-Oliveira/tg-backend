const router = require("express").Router();
const {AddressController} = require("../controllers");
const {create} = new AddressController();

// curl -X POST -d  http://localhost:9001/address/create
router.post("/create", create);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida com o usuário']});
})

module.exports = router;