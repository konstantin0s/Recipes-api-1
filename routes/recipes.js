const router = require('express').Router()
const { Recipe } = require('../models')

router.get('/recipes', (req, res, next) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((recipes) => res.json(recipes))
    .catch((error) => next(error))
  })
  .get('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  .post('/recipes', (req, res, next) => {
    let newRecipe = req.body
    newRecipe.authorId = req.account._id

    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .put('/recipes/:id', (req, res) => {
    const id = req.params.id
    Recipe.findById(id)

      Recipe.title = req.body.title;
      Recipe.summary = req.body.summary;
      Recipe.photo = req.body.photo;

    .then((recipe) => res.json(recipe))
    .catch((error) => next(error))
  })
  .delete('/recipes/:id', (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndRemove(id)
    res.json({ message: 'Recipe has been successfully removed!' });

  })

module.exports = router
