const { SendResponse } = require('../helpers/modifier');

const {
  ExchangeController,
} = require('../controllers');

class ExchangeManager {
  constructor() {
    this.getCurrencyExchangeData = this.getCurrencyExchangeData.bind(this);
  }

  async getCurrencyExchangeData(req, res) {
    const {
      fsyms,
      tsyms,
    } = req.query;

    const data = await ExchangeController.getCurrencyExchangeDataFromUrl({ fsyms, tsyms });

    ExchangeController.saveExchangeData({ fsyms, tsyms, exchangeData: data });

    SendResponse(res, data?.data, 200);
  }
}
module.exports = new ExchangeManager();
