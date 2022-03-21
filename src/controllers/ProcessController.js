const { webcrawler } = require('../utils/webcrawler')

class ProcessController {
  constructor(){
  }

  async main(){
    await webcrawler()
  }
}

module.exports = { ProcessController }