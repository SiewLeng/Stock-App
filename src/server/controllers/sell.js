const request = require('request');

module.exports = (db) => {
    let get = (request, response) => {
        let user_id = request.params.user_id;
        db.sell.get(user_id, (error, queryResult) => {
            if (error) {
                console.error('error getting buy:', error);
                response.sendStatus(500);
            }
            else {
                response.send(queryResult.rows);
            }
        })
    };

    let create = (request, response) => {
        let user_id = parseInt(request.body["user_id"]);
        let buy_id = parseInt(request.body["buy_id"]);
        let company_id = parseInt(request.body["company_id"]);
        let quantity = parseInt(request.body["quantity"]);
        let purchase_date = request.body["purchase_date"];
        let purchase_date_zone = request.body["purchase_datepurchase_date_zone"];
        let buy_price_sgd = parseFloat(request.body["buy_price_sgd"]);
        let buy_price = parseFloat(request.body["buy_price"]);
        let sold_price_sgd = parseFloat(request.body["sold_price_sgd"]);
        let sold_price = parseFloat(request.body["sold_price"]);
        let dividend_sgd = parseFloat(request.body["dividend_sgd"]);
        let dividend = parseFloat(request.body["dividend"]);

        db.sell.create(user_id, buy_id, company_id, quantity, purchase_date, purchase_date_zone, buy_price_sgd, buy_price, sold_price_sgd, sold_price, dividend_sgd, dividend, (err, queryResult)=> {
            if (err) {
                console.log(err);
            }
            else {
                if (queryResult.rowCount > 0) {
                    console.log("Delete buy and create sell is successful");
                }
                else {
                    console.log("Cannot create buy and sell");
                }
            }
            response.redirect('/');
        })
    }

    return {
        create: create,
        get: get
    };
};