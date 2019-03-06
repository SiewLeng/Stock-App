/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
    const get = (user_id, callback) => {
        let queryString = `SELECT * FROM buy INNER JOIN company ON (buy.company_symbol = company.symbol) WHERE buy.user_id = $1`;
        let values = [user_id];
        dbPoolInstance.query(queryString, values, (err, queryResult) => {
            callback(err, queryResult);
        })
    };

    const create = (user_id, symbol, price, priceSGD, numOfStock, company, callback) => {

        let queryString = `SELECT * FROM company WHERE symbol = $1`;
        let values = [symbol];
        dbPoolInstance.query(queryString, values, (err, queryResult) => {
            if (queryResult.rows.length == 0) {
                let queryString1 = `INSERT INTO company (symbol, name, type, region, market_open, market_close, timezone, currency)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
                let values1 = [
                    company["symbol"],
                    company["name"],
                    company["type"],
                    company["region"],
                    company["market_open"],
                    company["market_close"],
                    company["timezone"],
                    company["currency"]
                ];
                dbPoolInstance.query(queryString1, values1);
            }
        });

        let queryString2 = `INSERT INTO buy (user_id, company_symbol, quantity, price, price_sgd)
            VALUES ($1, $2, $3, $4, $5)`;
        let values2 = [
            user_id,
            symbol,
            numOfStock,
            parseFloat(price),
            parseFloat(priceSGD)
        ];
        dbPoolInstance.query(queryString2, values2, (err, queryResult) => {
            callback(err, queryResult);
        });
    }

    return {
        create,
        get,
    };
}