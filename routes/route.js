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
 * /api/students:
 *  get:
 *    summary: List all the students
 *    tags: [Students]
 *    responses:
 *      200:
 *        description: The list of the students
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Student'
 *  post:
 *    summary: Create a new student
 *    tags: [Students]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *          example:
 *            name: "Emmar Caber"
 *            age: 21
 *    responses:
 *      200:
 *        description: The created student.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      400:
 *        description: Some client error
 * /api/students/{id}:
 *  get:
 *    summary: Get a single student by id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    required: true
 *    description: The student id
 *    responses:
 *      200:
 *        description: The student response by id
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      400:
 *        description: The student was not found
 *  patch:
 *    summary: Update a student by id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *    required: true
 *    description: The student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      201:
 *        description: The student response by id
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      400:
 *        description: Some error message
 *  delete:
 *    summary: Remove a student by id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    responses:
 *      200:
 *        description: The student has been deleted
 *      404:
 *        description: Some error message
 */

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Post Method
router.post("/students", async (req, res) => {
  const data = new Student({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = data.save();
    res.status(200).json({ ...dataToSave });
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
router.patch("/students/:id", async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Student.findByIdAndUpdate(id, updatedData, options);

    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete by ID Method
router.delete("/students/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const data = await Student.findByIdAndDelete(idToDelete);

    res.status(200).send(`Student with ${data.name} has been deleted...`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
