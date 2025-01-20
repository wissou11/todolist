const express = require("express");
const Todo = require("../model/todo");

const router = express.Router();

// Récupérer la liste des todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des todos" });
  }
});

// Récupérer un todo par son ID
router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo non trouvé" });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du todo" });
  }
});

// Ajouter un nouveau todo
router.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout du todo" });
  }
});

// Modifier un todo
router.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: "Todo non trouvé" });
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du todo" });
  }
});

// Supprimer un todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo non trouvé" });
    res.status(200).json({ message: "Todo supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression du todo" });
  }
});

module.exports = router;
