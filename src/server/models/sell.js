/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = dbPoolInstance => {
  // `dbPoolInstance` is accessible within this function scope
  const get = callback => {
    let queryString =
      "SELECT * FROM sold INNER JOIN company ON (sold.company_id = company.company_id) WHERE company.company_id > 0";
    dbPoolInstance.query(queryString, (err, queryResult) => {
      callback(err, queryResult);
    });
  };

  const create = (
    buy_id,
    company_id,
    quantity,
    purchase_date,
    purchase_date_zone,
    buy_price_sgd,
    buy_price,
    sold_price_sgd,
    sold_price,
    dividend_sgd,
    dividend,
    callback
  ) => {
    let queryString1 = `INSERT INTO sold (company_id, quantity, purchase_date, purchase_date_zone, buy_price_sgd, buy_price, sold_price_sgd, sold_price, dividend_sgd, dividend) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    let values1 = [
      company_id,
      quantity,
      purchase_date,
      purchase_date_zone,
      buy_price_sgd,
      buy_price,
      sold_price_sgd,
      sold_price,
      dividend_sgd,
      dividend
    ];
    dbPoolInstance.query(queryString1, values1, (err, queryResult) => {
      if (err) {
        console.log(err);
      } else {
        let queryString2 = `DELETE FROM buy WHERE buy_id=$1`;
        let values2 = [buy_id];
        dbPoolInstance.query(queryString2, values2, (err, queryResult) => {
          callback(err, queryResult);
        });
      }
    });
  };

  return {
    create,
    get
  };
};
