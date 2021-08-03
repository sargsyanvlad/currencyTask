const axios = require('axios');
const db = require('../../db');

const { Op } = db.sequelize;

const {
  ExchangeData: ExchangeModel,
} = db;

const sequelize = db.Sequelize;

const {
  Op: {
    gte: $gte,
  },
} = sequelize;

class ExchangeController {
  constructor() {
    this.getCurrencyExchangeDataFromUrl = this.getCurrencyExchangeDataFromUrl.bind(this);
    this.saveExchangeData = this.saveExchangeData.bind(this);
    this.getFreshTime = this.getFreshTime.bind(this);
  }

  async getCurrencyExchangeDataFromUrl(data) {
    const { fsyms, tsyms } = data;
    try {
      return await axios({
        method: 'get',
        url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`,
        timeout: 1500,
      });
    } catch (e) {
      console.log('error +>>>>>>', e);
      return this.getCurrencyExchangeDataFromDb({ fsyms, tsyms });
    }
  }

  async getCurrencyExchangeDataFromDb(data) {
    console.log('DB=>');
    const { fsyms, tsyms } = data;
    const freshTime = this.getFreshTime();
    return ExchangeModel.findOne({
      where: {
        fsyms,
        tsyms,
        createdAt: { [$gte]: freshTime },
      },
    });
  }

  getFreshTime() {
    const date = new Date();
    return date.setMinutes(date.getMinutes() - 3);
  }

  saveExchangeData(data) {
    if (data && data.data) {
      const { fsyms, tsyms, exchangeData } = data.data;
      ExchangeModel.create({ fsyms, tsyms, exchangeData });
    }
  }
}
module.exports = new ExchangeController();
