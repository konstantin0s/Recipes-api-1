const router = require('express').Router()
const { Recipe } = require('../models')
const passport = require('../config/auth')

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
    // newRecipe.authorId = req.account._id

    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })


  // .put('/recipes/:id', passport.authorize('jwt', { session: false }), (req, res, next) => {
  //     Recipe.update({_id: req.params.id}, req.body) // update recipe with its id and take all from the body
  //       .then((recipe) => res.json(recipe))
  //       .catch((error) => next(error))
  //   })
  //   .patch('/recipes/:id', passport.authorize('jwt', { session: false }), (req, res, next) => {
  //     Recipe.update({_id: req.params.id}, {...req.body})
  //       .then((recipe) => res.json(recipe))
  //       .catch((error) => next(error))
  //   })
  //   .delete('/recipes/:id', passport.authorize('jwt', { session: false }), (req, res, next) => {
  //     const id = req.params.id
  //     Recipe.remove({_id: req.params.id})
  //     .then((recipe) => res.json(recipe))
  //     .catch((error) => next(error))
  //   })
module.exports = router
