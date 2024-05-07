import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// afficher produits
const afficherProduits = async (req, res, next) => {
  try {
    const produits = await prisma.produit.findMany();

    if (!produits) {
      return res
        .status(404)
        .json({ Erreur: "produit not found ! add some produits .." });
    }

    return res.status(200).json(produits);
  } catch (error) {
    next(error);
  }
};


//ajouter produit
const ajouterProduit = async (req, res, next) => {
  try {
    const { prix_achat, prix_vente,taux_marge,dimension ,taille,Produitcol,id_entreprise } = req.body;
    // Vérifiez si l'entreprise existe
    const existEntreprise = await prisma.entreprise.findUnique({
      where: {
        id_entreprise: parseInt(id_entreprise),
      },
    });

    if (!existEntreprise) {
      return res.status(400).json({ Erreur: "L'entreprise associée n'existe pas." });
    }

    const produit = await prisma.produit.create({
      data: {
        prix_achat,
        prix_vente,
        taux_marge,
        dimension ,
        taille,
        Produitcol,
        id_entreprise: parseInt(id_entreprise),
      },
    });
    return res.status(201).json({ success: "Produit added successfully", produit });
  } catch (error) {
    next(error);
  }
};


//modifier Produit
const modifierProduit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { prix_achat, prix_vente,taux_marge,dimension ,taille,Produitcol,id_entreprise } = req.body;

    const existProduit = await prisma.produit.findUnique({
      where: {
        Ref_Produit: parseInt(id),
      },
    });

    if (!existProduit) {
      return res.status(404).json({ Erreur: "Produit to update not found!" });
    }

    // Vérifiez si l'entreprise existe
    const existEntreprise = await prisma.entreprise.findUnique({
      where: {
        id_entreprise: parseInt(id_entreprise),
      },
    });

    if (!existEntreprise) {
      return res.status(400).json({ Erreur: "L'entreprise associée n'existe pas." });
    }

    const produit = await prisma.produit.update({
      where: {
        Ref_Produit: parseInt(id),
      },
      data: {
        prix_achat,
        prix_vente,
        taux_marge,
        dimension ,
        taille,
        Produitcol,
        id_entreprise: parseInt(id_entreprise),
      },
    });
    return res.status(200).json({ success: "Produit updated successfully", produit });
  } catch (error) {
    next(error);
  }
};


// delete client
const supprimerProduit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existProduit = await prisma.produit.findUnique({
      where: {
        Ref_Produit: parseInt(id),
      },
    });

    if (!existProduit) {
      return res.status(404).json({ Erreur: "produit to delete not found!" });
    }

    const produit= await prisma.produit.delete({
      where: {
        Ref_Produit: parseInt(id),
      },
    });
    return res.status(200).json({ success: "produit deleted successfully",produit });
  } catch (error) {
    next(error);
  }
};

export {afficherProduits,ajouterProduit,modifierProduit,supprimerProduit} ;
