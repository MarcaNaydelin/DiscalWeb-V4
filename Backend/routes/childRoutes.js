const express = require("express");
const router = express.Router();
const childController = require("../controllers/childController");
const validateChild = require("../middlewares/validateChild");

router.post("/create", validateChild, childController.createChildProfile);
router.get("/parent/:parent_id", childController.getChildrenByParent);
router.put("/update/:id", validateChild, childController.updateChildProfile);

module.exports = router;