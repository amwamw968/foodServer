/**
 * kidinfo
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const RESULT_CODE  = require('./kidcode') ;
const TAG = "[KidInfo] ";

module.exports = {
  friendlyName: 'fav',
  description: 'fav.',
  inputs: {
    fav: {
      description: 'An array of fav recipe to add  .',
      type: [
        {
          name: 'string',
          amount: 'string'
        }
      ],
      example: [
        {
          name: 'youtiao',
          amount: '200g'
        }
      ],
    }


  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
    },

    notFound: {
      description: 'There is no found Kid with that ID.',
      responseType: 'notFound'
    },

  },


  fn: async function (inputs, exits) {

    console.log(TAG + "enter fav Controller")
    console.log(this.req.body)


    let existingUser = await Kidinfo.findOne({name: this.req.body.name});

    console.log(TAG + "findOne")
    console.log(existingUser)


    if (!existingUser || (existingUser === undefined)) {
      console.log(TAG + "notFound")
      throw 'notFound';
    }


    let recipeExist = await Recipe.findOne({ingredient_name: this.req.body.ingredient_name});

    console.log(TAG + "Recipe findone")
    console.log(recipeExist)

    if (!recipeExist || (recipeExist === undefined)) {
      console.log(TAG + "notFound")
      let newRecipeRecord = await Recipe.create(Object.assign({}, {ingredient_name: this.req.body.ingredient_name, amount: this.req.body.amount}))
        .intercept({ingredient_name: 'UsageError'}, 'invalid')
        .fetch();
      console.log(TAG + "newRecipeRecord")
      console.log(newRecipeRecord)
      if (!newRecipeRecord || (newRecipeRecord === undefined)) {
         console.log(TAG + "notFound")
         throw 'notFound';
      }

      await Kidinfo.addToCollection(existingUser.id, 'fav')
        .members([newRecipeRecord.id]);

    }
    else {
      await Kidinfo.addToCollection(existingUser.id, 'fav')
        .members([recipeExist.id]);
    }


    let existingUser1 = await Kidinfo.findOne({name: this.req.body.name})
      .populate('fav');

    console.log(TAG + "Kidinfo wiht fav: ")
    console.log(existingUser1)


    /*for (let fav of inputs.fav) {




    }*/
    return exits.success(existingUser1);
  }

};

