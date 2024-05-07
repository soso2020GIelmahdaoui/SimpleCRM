import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// afficher clients
const afficherClients = async (req, res, next) => {
  try {
    const clients = await prisma.clients.findMany();

    if (!clients) {
      return res
        .status(404)
        .json({ Erreur: "client not found ! add some clients .." });
    }

    return res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

// afficher un client par son ID
const afficherClientById = async (req, res, next) => {
  try {
    const { id } = req.params; 
    
    const client = await prisma.clients.findUnique({
      where: {
        idClients: parseInt(id), 
      },
    });

    if (!client) {
      return res.status(404).json({ Erreur: "Client not found!" });
    }

    return res.status(200).json(client);
  } catch (error) {
    next(error); 
  }
};

//ajouter client
const ajouterClient = async (req, res, next) => {
  try {
    const { nom_client, prenom_client, adress, ville_client, num_tele, email_client, id_entreprise } = req.body;
    // Vérifiez si l'entreprise existe
    const existEntreprise = await prisma.entreprise.findUnique({
      where: {
        id_entreprise: parseInt(id_entreprise),
      },
    });

    if (!existEntreprise) {
      return res.status(400).json({ Erreur: "L'entreprise associée n'existe pas." });
    }

    const client = await prisma.clients.create({
      data: {
        nom_client,
        prenom_client,
        adress,
        ville_client,
        num_tele,
        email_client,
        id_entreprise: parseInt(id_entreprise),
      },
    });
    return res.status(201).json({ success: "client added successfully", client });
  } catch (error) {
    next(error);
  }
};


//modifier client
const modifierClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom_client, prenom_client, adress, ville_client, num_tele, email_client, id_entreprise } = req.body;

    const existClient = await prisma.clients.findUnique({
      where: {
        idClients: parseInt(id),
      },
    });

    if (!existClient) {
      return res.status(404).json({ Erreur: "Client to update not found!" });
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

    const client = await prisma.clients.update({
      where: {
        idClients: parseInt(id),
      },
      data: {
        nom_client,
        prenom_client,
        adress,
        ville_client,
        num_tele,
        email_client,
        id_entreprise: parseInt(id_entreprise),
      },
    });
    return res.status(200).json({ success: "Client updated successfully", client });
  } catch (error) {
    next(error);
  }
};


// delete client
const supprimerClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existClient = await prisma.clients.findUnique({
      where: {
        idClients: parseInt(id),
      },
    });

    if (!existClient) {
      return res.status(404).json({ Erreur: "facture to delete not found!" });
    }

    const facture = await prisma.prsima.delete({
      where: {
        idClients: parseInt(id),
      },
    });
    return res.status(200).json({ success: "client deleted successfully", facture });
  } catch (error) {
    next(error);
  }
};

export {afficherClients,afficherClientById,ajouterClient,modifierClient,supprimerClient} ;
