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
    const data = await Model.find().select("name age");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const idToFind = req.params.id;
    const data = await Model.findById(idToFind).select("name age -_id");
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const data = await Model.findByIdAndDelete(idToDelete);

    res.send(`Document with ${data.name} has been deleted...`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
