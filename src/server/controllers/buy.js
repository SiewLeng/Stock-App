const request = require('request');

module.exports = (db) => {
    let apiget = (request, response) => {
        const stuff = {
        banana: 'oranges',
        kiwi: 'apple'
        };

        response.send(stuff);
    };

    let create = (req, res) => {
        let symbol = req.params.symbol;
        let price = req.params.price;
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

        let apiKey = "F50ZLADJBWFCDCWT";
        let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${company["currency"]}&to_currency=SGD&apikey=${apiKey}`;

        request(url, function (error, queryResponse, body) {
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', queryResponse && queryResponse.statusCode); // Print the response status code if a response was received
            let exchangeRate = JSON.parse(body)["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
            let priceSGD = "" + (parseFloat(exchangeRate) * parseFloat(price));

            db.buy.create(symbol, price, priceSGD, numOfStock, company, (error, queryResult) => {
                if (error) {
                    console.error('error getting buy:', error);
                    res.sendStatus(500);
                }
                if (queryResult.rowCount >= 1) {
                    console.log('Buy created successfully');
                }
                else {
                    console.log('Buy could not be created');
                }
                // redirect to home page after creation
                res.redirect('/');
            });
        })
    }

    return {
        create: create,
        apiget: apiget
    };
};