/**
 * Fooddetail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


const recipe = require('./recipe');


module.exports = {

  /*let ratinginfo = {
    count: Number,
    score: Number,
    isEffect: Boolean
  },*/

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    title: {
      type: 'string',
      maxLength: 200,
      description: '食物名'
    },

    /*longIntro: {
      type: 'string',
      maxLength: 500,
      description: '简介'
    },

    cover: {
      type: 'string',
      maxLength: 500,
      description: '图片'
    },

    majorCate: {
      type: 'string',
      maxLength: 500,
      description: '主要类别'
    },

    minorCate: {
      type: 'string',
      maxLength: 500,
      description: '二级类别'
    },

    latelyFollower: {
      type: 'number',
      description: '喜爱这种食物的人数'
    },
    retentionRatio: {
      type: 'number',
      description: '当前食物评级'
    },

    gender: {
      type: 'number',
      isIn: [0,1],
      description: '男, 女'
    },

    tags: {
      type: 'string',
      description: '标签'
    },

    contentType: {
      type: 'string',
      description: '食物类型'
    },
    //rating: ratinginfo,//评分信息
    rating: {
      type: 'ref',
      description: '评分信息'
    },
    isCollect: {
      type: 'boolean',
      defaultsTo: false,
      description:'是否收藏'
    },*/
    isrecipe:{
      type: 'ref',
      columnName: 'recipe'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

