
const RESULT_CODE  = require('./kidinfo/kidcode') ;
module.exports = {


  friendlyName: 'View recipe',


  description: 'Display "Recipe" page.',


  exits: {

    success: {
      //viewTemplatePath: 'pages/recipe'
    },
    serverError:{
      statusCode: 404,
      description: 'serverError',
    }

  },


  fn: async function (inputs, exits) {
    console.log('new get recipe enter')
    console.log(this.req.query)
    console.log(this.req.query.keyword)
    let that1 = JSON.stringify(this.req.query.keyword);
    console.log(that1)
    if (that1 === undefined){
	   this.res.json({
        code: RESULT_CODE.ARG_ERROR.code,
        msg: RESULT_CODE.ARG_ERROR.msg,
        data: RESULT_CODE.ARG_ERROR.msg
      });
      return exits.serverError();
    }

    //let SQL_QUERY ="SELECT * FROM recipe  WHERE MATCH (`name`,`amount`) AGAINST ('200' IN BOOLEAN MODE)";
    let SQL_QUERY ="SELECT * FROM recipe  WHERE MATCH (`ingredient_name`,`amount`) AGAINST (" + that1  + " IN BOOLEAN MODE)";
    //let SQL_QUERY2 = "ALTER TABLE recipe ADD FULLTEXT INDEX name_amount  (`name`, `amount`) WITH PARSER ngram";

    console.log(SQL_QUERY)

    //let userRecord2 = await sails.sendNativeQuery(SQL_QUERY2, '');


    let userRecord = await sails.sendNativeQuery(SQL_QUERY, '');

    /*let userRecord = await Recipe.find({
      amount: this.req.query.amount
    });*/

    // If there was no matching user, respond thru the "badCombo" exit.
    if(!userRecord) {
      throw 'badCombo';
    }
    console.log('new get recipe enter');
    //console.log(this.res);
    // Respond with view.
    /*if (this.req.wantsJSON){
      return this.res.json(userRecord);
    }
    else {*/
      return exits.success(userRecord);
    //}
  }

};
