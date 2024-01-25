const express = require("express");
const router = express.Router();
const Model = require("../models/model");

// Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find().select("name age -_id");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

// Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

// Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

module.exports = router;
