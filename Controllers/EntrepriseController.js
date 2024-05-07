import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// afficher Entreprise
const afficherEntreprise = async (req, res, next) => {
  try {
    const Entreprises = await prisma.entreprise.findMany();

    if (!Entreprises) {
      return res
        .status(404)
        .json({ Erreur: "Entreprise not found ! add some entreprises .." });
    }

    return res.status(200).json(Entreprises);
  } catch (error) {
    next(error);
  }
};


//ajouter entreprise

const ajouterEntreprise = async (req, res, next) => {
  try {
    const {  nom,siege ,date_creation ,id_fiscal,capital, nbre_employ_ ,ville ,Responsable,num_tele,email} = req.body;
    const entreprise = await prisma.entreprise.create({
      data: {
        nom          ,
        siege         ,
        date_creation:new Date(date_creation),
        id_fiscal   ,
        capital      ,
        nbre_employ_ ,
        ville         ,
        Responsable,
        num_tele     ,
        email        ,
      },
    });
    return res.status(201).json({ sucess: "entreprise added successfully", entreprise });
  } catch (error) {
    next(error);
  }
};



//modifier entreprise
const modifierEntreprise= async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom,siege ,date_creation ,id_fiscal,capital, nbre_employ_ ,ville ,Responsable,num_tele,email } = req.body;

    const existEntreprise = await prisma.entreprise.findUnique({
      where: {
        id_entreprise : parseInt(id),
      },
    });

    if (!existEntreprise) {
      return res.status(404).json({ Erreur: "Entreprise to update not found !" });
    }

    const Entreprise = await prisma.entreprise.update({
      where: {
        id_entreprise: parseInt(id),
      },
      data: {
        nom          ,
        siege         ,
        date_creation:new Date(date_creation),
        id_fiscal   ,
        capital      ,
        nbre_employ_ ,
        ville         ,
        Responsable,
        num_tele     ,
        email        ,
      },
    });
    return res.status(200).json({ sucess: "Entreprise updated successfully", Entreprise });
  } catch (error) {
    next(error);
  }
};

// delete Entreprise
const supprimerEntreprise = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existEntreprise = await prisma.entreprise.findUnique({
      where: {
        id_entreprise: parseInt(id),
      },
    });

    if (!existEntreprise) {
      return res.status(404).json({ Erreur: "Entreprise to delete not found !" });
    }

    const Entreprise = await prisma.entreprise.delete({
      where: {
        id_entreprise: parseInt(id),
      },
    });
    return res.status(200).json({ sucess: "client deleted successfully", Entreprise });
  } catch (error) {
    next(error);
  }
};
export {afficherEntreprise,ajouterEntreprise,modifierEntreprise,supprimerEntreprise} 
