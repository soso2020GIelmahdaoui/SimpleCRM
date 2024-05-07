import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import express, { json } from "express";
const app = express();
app.use(express.json()); 

import { afficherClientById, afficherClients, ajouterClient,modifierClient,supprimerClient } from "./Controllers/ClientController.js";
import { afficherEntreprise, ajouterEntreprise, modifierEntreprise, supprimerEntreprise } from "./Controllers/EntrepriseController.js";
import { afficherProduits, ajouterProduit, modifierProduit, supprimerProduit } from "./Controllers/ProduitController.js";

import { afficherFactures,afficherFactureById,ajouterFacture, modifierFacture, supprimerFacture} from "./Controllers/FactureController.js";
//Crud of client

app.use(express.json());
app.route("/clients").get(afficherClients).post(ajouterClient);
app.route("/clients/:id").get(afficherClientById).put(modifierClient).delete(supprimerFacture);

//crud of entreprise

app.route("/Entreprises").get(afficherEntreprise).post(ajouterEntreprise);
app.route("/Entreprises/:id").put(modifierEntreprise).delete(supprimerEntreprise);

//crud of product 
app.route("/produits").get(afficherProduits).post(ajouterProduit);
app.route("/produits/:id").put(modifierProduit).delete(supprimerProduit);

//crud of facture
app.route("/factures").get(afficherFactures).post(ajouterFacture);
app.route("/factures/:id").get(afficherFactureById).put(modifierFacture).delete(supprimerClient);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({
    erreur: "Un erreur serveur , contactez votre Admin",
  });
});
const port=process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});