import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// afficher clients
const afficherFactures = async (req, res, next) => {
  try {
    const Factures = await prisma.facture.findMany();

    if (!Factures) {
      return res
        .status(404)
        .json({ Erreur: "facture not found ! add some factures .." });
    }

    return res.status(200).json(Factures);
  } catch (error) {
    next(error);
  }
};

// afficher un client par son ID
const afficherFactureById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    
    const facture = await prisma.facture.findUnique({
      where: {
        ID_Facture: parseInt(id), 
      },
    });

    if (!facture) {
      return res.status(404).json({ Erreur: "Facture not found!" });
    }

    return res.status(200).json(facture);
  } catch (error) {
    next(error); 
  }
};

//ajouter facture
const ajouterFacture = async (req, res, next) => {
  try {
    const { Date_Facture ,ID_Client ,montant  } = req.body;
    // Vérifiez si l'entreprise existe
    const existClient = await prisma.clients.findUnique({
      where: {
        idClients: parseInt(ID_Client),
      },
    });

    if (!existClient) {
      return res.status(400).json({ Erreur: "le client associée n'existe pas." });
    }

    const facture = await prisma.facture.create({
      data: {
     
        Date_Facture ,
        ID_Client    :parseInt(ID_Client),
        montant     ,
      
      },
    });
    return res.status(201).json({ success: "facture added successfully", facture });
  } catch (error) {
    next(error);
  }
};


//modifier facture
const modifierFacture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Date_Facture ,ID_Client ,montant } = req.body;

    const existFacture = await prisma.facture.findUnique({
      where: {
        ID_Facture: parseInt(id),
      },
    });

    if (!existFacture) {
      return res.status(404).json({ Erreur: "facture to update not found!" });
    }

    // Vérifiez si le client existe
    const existClient = await prisma.clients.findUnique({
      where: {
        idClients: parseInt(ID_Client),
      },
    });

    if (!existClient) {
      return res.status(400).json({ Erreur: "le client associée n'existe pas." });
    }

    const facture = await prisma.facture.update({
      where: {
        ID_Facture: parseInt(id),
      },
      data: {
        Date_Facture ,
        ID_Client    :parseInt(ID_Client),
        montant     ,
      },
    });
    return res.status(200).json({ success: "facture updated successfully", facture });
  } catch (error) {
    next(error);
  }
};


// delete facture
const supprimerFacture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existFacture = await prisma.facture.findUnique({
      where: {
        ID_Facture: parseInt(id),
      },
    });

    if (!existFacture) {
      return res.status(404).json({ Erreur: "facture to delete not found!" });
    }

    const facture = await prisma.facture.delete({
      where: {
        ID_Facture: parseInt(id),
      },
    });
    return res.status(200).json({ success: "facture deleted successfully", facture });
  } catch (error) {
    next(error);
  }
};

export {afficherFactures,afficherFactureById,ajouterFacture,modifierFacture,supprimerFacture} ;
