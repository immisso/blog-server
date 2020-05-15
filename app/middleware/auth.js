/*
 * @Author: 柒叶
 * @Date: 2020-05-07 13:44:05
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-15 11:01:41
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
        ctx.throw(401, 'token does not exist');
      }
      // { id: 1, name: 'test', iat: 1574651611, exp: 1574711611 }
      const { uid, exp, email } = jwt.verify(token, SECRET) || {};
      ctx.locals.uid = uid;
      ctx.locals.exp = exp;
      ctx.locals.email = email;
      await next();
    } catch (e) {
      ctx.body = { code: 401, msg: e.message || 'invalid or expired token' };
    }
  };
};
