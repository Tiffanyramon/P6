const Sauce = require('../models/sauce')
const fs = require('fs');
const { STATUS_CODES } = require('http');
// obtenir toutes les auces 
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json( { error }))   
};
// obtenir une sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error: error }))
};
// creation de sauce 
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl:
    `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
   .then(() => res.status(201).json({message: 'Sauce enregistré'}))
   .catch(error => res.status(400).json ({ error }))
};
//modifie une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl:
`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       } : { ...req.body };
     Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
     .then(() => res.status(200).json({message: 'Sauce modifié'}))
     .catch(error => res.status(400).json ({ error }))
  };
  //supprime sauce 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/image/')[1]
      fs.unlink(`image/${filename}`, () =>{
        Sauce.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Sauce supprimé'}))
        .catch(error => res.status(400).json ({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
    }
// liker ou disliker les sauces
exports.likeSauceNot = async (req, res, next) => {
  const { userId, like } = req.body;
  const { id } = req.params;

  switch (like) {
    case 1:
      return Sauce.updateOne(
        { _id: id },
        { $push: { usersLiked: userId }, $inc: { likes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Updated" }))
        .catch((e) => res.status(400).json({ error: "Error" }));
    case 0:
      const sauce = await Sauce.findOne({ _id: id });

      if (sauce.usersLiked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((e) => res.status(400).json({ error: "Error" }));
      } else if (sauce.usersDisliked.includes(userId)) {
        return Sauce.updateOne(
          { _id: id },
          { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
        )
          .then(() => res.status(200).json({ message: "Updated" }))
          .catch((e) => res.status(400).json({ error: "Error" }));
      } else {
        return res
          .status(400)
          .json({ error: "The user did not give a feedback yet" });
      }

    case -1:
      return Sauce.updateOne(
        { _id: id },
        { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
      )
        .then(() => res.status(200).json({ message: "Updated" }))
        .catch((e) => res.status(400).json({ error: "Error" }));
  }
};
