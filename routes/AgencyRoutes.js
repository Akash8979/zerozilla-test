let express = require("express");
let router = express.Router();
let AgencyClientController = require("../controller/AgencyClientController");


router.post("/create", AgencyClientController.createAgency);
router.get("/clients", AgencyClientController.getAgency);
router.put("/update-client", AgencyClientController.updateClient);


module.exports = router;
