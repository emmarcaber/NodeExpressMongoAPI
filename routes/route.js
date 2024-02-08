/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           description: The name of student
 *         age:
 *           type: number
 *           description: The age of student
 *       example:
 *         name: Emmar Caber
 *         age: 21
 */

/**
 * @swagger
 * tags: Students
 * description: The students managing API
 * /students:
 */

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Post Method
router.post("/students/post", async (req, res) => {
  const data = new Student({
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
router.get("/students", async (req, res) => {
  try {
    const data = await Student.find().select("name age");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get by ID Method
router.get("/students/:id", async (req, res) => {
  try {
    const idToFind = req.params.id;
    const data = await Student.findById(idToFind).select("name age -_id");
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update by ID Method
router.patch("/students/update/:id", async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Student.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete by ID Method
router.delete("/students/delete/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const data = await Student.findByIdAndDelete(idToDelete);

    res.send(`Document with ${data.name} has been deleted...`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
