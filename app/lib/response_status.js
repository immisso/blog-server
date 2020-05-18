/*
 * @Author: 柒叶
 * @Date: 2020-04-05 16:36:57
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-11 17:28:49
 */
'use strict';

class ResponseStatus {
  // success
  Success(status, message, data) {
    const success = true;
    return {
      status: status || 200,
      message: message || 'Success',
      success,
      data,
    };
  }

  // fail
  Fail(status, message) {
    const success = false;
    return {
      status: status || false,
      message: message || 'Server Error ~',
      success,
    };
  }
}

module.exports = new ResponseStatus();
