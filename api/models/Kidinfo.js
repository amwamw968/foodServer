/**
 * Kidinfo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    name: {
      type: 'string',
      description: '用户名'
    },

    nickname: {
      type: 'string',
      description: '昵称'
    },
    password: {
      type: 'string',
      description: '密码（加密'
    },
    avatar: {
      type: 'string',
      description: '用户头像'
    },
    brief: {
      type: 'string',
      description: '用户简介'
    },
    token: {
      type: 'string',
      description: '用户token'
    },

    //logindate: {type: Date, default: moment().utc(true).format('x')},//登录时间
   // likefood: [{type: String, ref: 'food_detail', require: true}]
    fav: { collection: 'Recipe', description: 'The user who uploaded this item.' },
  },

};

