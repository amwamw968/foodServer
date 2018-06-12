/**
 * kidinfo
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const RESULT_CODE  = require('./kidcode') ;

module.exports =  {


  friendlyName: 'kidregister',


  description: 'kidregister.',




  inputs: {

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


  /**
   * 用户注册
   */
  fn: async function (inputs, exits) {
    console.log("kidRegister:");
    console.log(this.req.body);
    let name = this.req.body.name;
    let password = this.req.body.password;

    console.log("name:" + name);
    console.log("password:" + password);

    await Kidinfo
      .findOne({name: name})
      .exec(async (err, data) => {
                if (err) {
                  console.log(err);
                  return exits.serverError;
                }
                if (data != null) {
                  console.log('用户已经注册，请直接登录');
                  this.res.json({
                    code: RESULT_CODE.SUCCESS.code,
                    msg: RESULT_CODE.SUCCESS.msg,
                    data: '用户已经注册，请直接登录'
                  });
                  return exits.success;
                }
                //对密码进行加密存入数据库(在这里加上Kid字符串加密存入数据库)
                let pass = crypto.createHash('md5').update(password + 'Kid').digest('hex');
                let token = jwt.sign({name: name}, 'wyjwtsecret', {
                  expiresIn: "30d"  // 一个月过期
                });

                let kid = {};
                kid.name = name;
                kid.nickname = 'Kid-' + name;
                kid.password = pass;
                kid.token = token;
                kid.icon = '/images/avatar/default_avatar.jpg';
                kid.brief = 'for baby food';
                //kid.logindate = new Date();
                await Kidinfo.create(kid, async (err, result) => {
                  if (err) {
                    console.log(err);
                    console.log('注册失败');
                    this.res.json({
                      code: RESULT_CODE.SUCCESS.code,
                      msg: RESULT_CODE.SUCCESS.msg,
                      data: '注册失败'
                    });
                    return exits.serverError;
                  }
                  console.log(result);
                  console.log('注册成功');
                  this.res.json({
                    code: RESULT_CODE.SUCCESS.code,
                    msg: RESULT_CODE.SUCCESS.msg,
                    data: '注册成功'
                  });
                })
      });
  },
}


//module.exports = new KidinfoController();

