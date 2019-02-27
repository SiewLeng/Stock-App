module.exports = (app, db) => {
    const buy = require('./controllers/buy')(db);
    const queryCompany = require('./controllers/queryCompany')(db);
    const queryStockEndPoint = require('./controllers/queryStockEndPoint')(db);
    const queryStockDaily = require('./controllers/queryStockDaily')(db);
    const queryStockMonthly = require('./controllers/queryStockMonthly')(db);
    const queryExchangeRate = require('./controllers/queryExchangeRate')(db);

    app.get('/queryCompany', queryCompany.get);
    app.get('/queryStockEndPoint', queryStockEndPoint.get);
    app.get('/queryStockDaily', queryStockDaily.get);
    app.get('/queryStockMonthly', queryStockMonthly.get);
    app.get('/queryExchangeRate', queryExchangeRate.get)
    app.post('/addStock/:symbol/:price', buy.create);
    app.get('/allBuy', buy.get);
    /*
    app.get('/pokemon/:id', pokemon.get);
    app.get('/api/pokemon/:id', pokemon.apiget);
    */
};