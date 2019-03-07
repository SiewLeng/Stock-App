module.exports = (app, db) => {
    const buy = require('./controllers/buy')(db);
    const sell = require('./controllers/sell')(db);
    const user = require('./controllers/user')(db);
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
    app.post('/addStock', buy.create);
    app.post('/addSold', sell.create);
    app.get('/allBuy/:user_id', buy.get);
    app.get('/allSold/:user_id', sell.get);
    app.get('/checkUser', user.get);
    app.post('/addUser', user.create);
};