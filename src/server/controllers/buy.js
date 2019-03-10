const request = require('request');

module.exports = (db) => {
    let get = (request, response) => {
        let user_id = request.params.user_id;
        db.buy.get(user_id, (error, queryResult) => {
            if (error) {
                console.error('error getting buy:', error);
                response.sendStatus(500);
            }
            else {
                response.send(queryResult.rows);
            }
        })
    };

    let create = (req, res) => {
        let user_id = req.body["user_id"];
        let symbol = req.body["symbol"];
        let price = req.body["price"];
        let numOfStock = parseInt(req.body.number);
        let company = {
            symbol: req.body["symbol"],
            name: req.body["name"],
            type: req.body["type"],
            region: req.body["region"],
            market_open: req.body["market_open"],
            market_close: req.body["market_close"],
            timezone: req.body["timezone"],
            currency: req.body["currency"],
        };

        let apiKey = process.env.API_KEY2;;
        let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${company["currency"]}&to_currency=SGD&apikey=${apiKey}`;
        setTimeout(function() {
            request(url, function (error, queryResponse, body) {
                console.log('error:', error); // Print the error if one occurred and handle it
                console.log('statusCode:', queryResponse && queryResponse.statusCode); // Print the response status code if a response was received
                let exchangeRate = JSON.parse(body)["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                let priceSGD = "" + (parseFloat(exchangeRate) * parseFloat(price));

                db.buy.create(user_id, symbol, price, priceSGD, numOfStock, company, (error, queryResult) => {
                    if (error) {
                        console.error('error getting buy:', error);
                        res.sendStatus(500);
                    }
                    if (queryResult.rowCount >= 1) {
                        res.send({buyCreated: true});
                    }
                    else {
                        res.send({buyCreated: false});
                    }
                });
            }) }, 12000)
    }

    return {
        create: create,
        get: get
    };
};