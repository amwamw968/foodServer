/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const iconv = require("iconv-lite");

module.exports = {
  friendlyName: 'recipe',


  description: 'recipe.',




  inputs: {

    ingredient_name: {
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'ingredient_name'
    },

    amount: {
      type: 'string',
      required: true,
      description: 'recipe amount.',
      example: '200g'
    }
  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
    },
    serverError:{
      statusCode: 404,
      description: 'serverError',
    }
  },


  fn: async function (inputs, exits) {

    console.log("enter Recipe Controller")
    console.log(inputs.ingredient_name)
    let newName = inputs.ingredient_name;
    let newAmount = inputs.amount;


    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    /*var newUserRecord = await Recipe.create(Object.assign({}, {ingredient_name: newName, amount: newAmount}))
      .intercept({ingredient_name: 'UsageError'}, 'invalid')
      .fetch();*/


    var newUserRecord = await Recipe.findOrCreate({ where: { ingredient_name: newName }},
      {ingredient_name: newName, amount: newAmount})
      /*.intercept((err)=>{
        // Return a modified error here (or a special exit signal)
        // and .create() will throw that instead
        err.message = 'Uh oh: '+err.message;
        console.log('error: ' + err);

        return err;
      })*/
      .exec(async(err, newOrExistingRecord, wasCreated)=> {
          if (err){
            err.message = 'Uh oh: '+err.message;
            console.log('error: ' + err);

            return err;
          }
          console.log('newOrExistingRecord')
          console.log(newOrExistingRecord)

          if(wasCreated) {
            console.log('Created a new name: ' + inputs.ingredient_name);
          }
          else {
            console.log('Found existing name: ' + inputs.ingredient_name);

            await Recipe.update({ ingredient_name: newName }).set({
              ingredient_name: newName, amount: newAmount
            });
          }
      });

    // Since everything went ok, send our 200 response.
    return exits.success(newUserRecord);

  }

};

