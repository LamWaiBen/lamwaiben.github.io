'use strict';

const Controller = require('egg').Controller;
const mongoose = require('mongoose');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async registered() {
    const { ctx } = this;
    try {
      const data = ctx.request.body;
      const User = mongoose.model('User');
      await User.create(data)
      ctx.body = this.app.json_result([true, 200, 'Create Success']);
    } catch (err) {
      console.log(err);
      ctx.body = this.app.json_result([false, 401, err]);
    }
  }
  async getByUsername(){
    const { ctx } = this;
    try {
      const username = ctx.params.username
      const User = mongoose.model('User');
      const user = await User.findOne({ username })
      ctx.body = this.app.json_result([true, 200, 'Get Success', user || {}]);
    } catch (err) {
      console.log(err);
      ctx.body = this.app.json_result([false, 401, err]);
    }
  }
}

module.exports = HomeController;
