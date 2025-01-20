const express = require("express");
const router = express.Router();
const User = require("../model/user.js");

// Connexion utilisateur
router.get("/users", async (req, res) => {
  const { login, password } = req.query;

  try {
    const user = await User.findOne({ login, password }); // Filtrer par login et password
    if (user) {
      res.json([user]); // Renvoyer l'utilisateur dans un tableau (comme attendu par Angular)
    } else {
      res.json([]); // Aucun utilisateur trouvé
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Récupérer la liste des todos

module.exports = router;
