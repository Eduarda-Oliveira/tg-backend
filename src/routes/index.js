const router = require("express").Router();

const clientRoute = require("./client");
const itemRoute = require("./item");
const PhoneRoute = require("./phone");
const AddressRoute = require("./address");
const CategoryController = require("./category");


router.use("/client", clientRoute);
router.use("/item", itemRoute);
router.use("/phone", PhoneRoute);
router.use("/address", AddressRoute);
router.use("/category", CategoryController);




router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida index']});
})

module.exports = router;