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
   * 用户登录
   */
  fn: async function (inputs, exits) {
    console.log('kidLogin: ');
    console.log(this.req.query);
    let name = this.req.query.name ;
    let password = this.req.query.password;
    console.log("req.name");
    console.log(name);
    console.log("req.password");
    console.log(password);
    if (name === undefined || password === undefined)
    {
      this.res.json({
        code: RESULT_CODE.ARG_ERROR.code,
        msg: RESULT_CODE.ARG_ERROR.msg,
        data: RESULT_CODE.ARG_ERROR.msg
      });
      //throw  "serverError";
      return exits.serverError();
    }
    //let logindate = moment().utc(true).format('x');
    await Kidinfo
      .findOne({name: name})
      .populate('fav')
      .exec(async (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        if (data == null) {
          console.log('此用户没有注册');
          this.res.json({
            code: RESULT_CODE.NO_DATA.code,
            msg: '此用户没有注册',
          });
          return;
        }

        console.log("data:");
        console.log(data);


        console.log('password==' + password);
        //登录时先把前端传过来的密码进行md5
        //let encrypt = crypto.createHash('md5').update(password).digest('hex');
        //然后对已经md5的密码带上WeYue字符串再次加密和数据库里面存入的密码对比
        let pass = crypto.createHash('md5').update(password + 'Kid').digest('hex');

        console.log('password==' + data.password + '==password==' + pass);
        //data.logindate = logindate;
        //console.log(data.logindate);
        if (data.password == pass) {
          let token = jwt.sign({name: name}, 'wyjwtsecret', {
            expiresIn: "30d" // 一个月过期
          });
          console.log("tokenlogin==" + token);
          //await Kidinfo.update({name: name}, {token: token},{logindate:logindate}, (err, result) => {
          await Kidinfo.update({name: name}, {token: token}, async (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log('更新token成功');
            }
          });

          //把最新的token存入数据库
          data.token = token;

          this.res.json({
            code: RESULT_CODE.SUCCESS.code,
            msg: RESULT_CODE.SUCCESS.msg,
            data: data
          });
        } else {
          this.res.json({
            code: RESULT_CODE.ARG_ERROR.code,
            msg: '密码错误',
          });
        }
      });

  }

}



