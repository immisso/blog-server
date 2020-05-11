/*
 * @Author: 柒叶
 * @Date: 2020-05-07 13:44:05
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 12:59:51
 */

'use strict';

const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config/secret');

module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const token = ctx.cookies.get('_token', {
        signed: false,
        encrypt: true,
      });
      if (!token) {
        ctx.throw(401, '无效的Token');
      }

      // jwt.verify(token, SECRET, (err, decode) => {
      //   if (err) {
      //     ctx.throw(401, err.message);
      //   }
      //   // 写验证token逻辑
      //   if (!decode.name === 'test' || !decode.id === 1) {
      //     ctx.throw(401, 'Token Can not pass');
      //   }
      //   // await next()
      //   // { id: 1, name: 'test', iat: 1574651611, exp: 1574711611 }
      // });
      const { id, exp, email } = jwt.verify(token, SECRET) || {};
      ctx.locals.id = id;
      ctx.locals.exp = exp;
      ctx.locals.email = email;
      await next();
    } catch (e) {
      console.log('dddddddddddddddddddddddddddddddd');
      console.log(e);
      ctx.body = { code: 500, msg: '无效的Token' };
    }
  };
};
