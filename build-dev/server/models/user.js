/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
    const get = (email, callback) => {
        let queryString = `SELECT * FROM users WHERE email=$1`;
        let values = [email];
        dbPoolInstance.query(queryString, values, (err, queryResult) => {
            callback(err, queryResult);
        })
    };

    const create = (email, password, callback) => {
        let queryString = `SELECT * FROM users WHERE email=$1`;
        let values =[email];
        dbPoolInstance.query(queryString, values, (err, queryResult) => {
            if (queryResult.rows.length == 0) {
                let queryString1 = `INSERT INTO users (email, password) VALUES ($1, $2)`;
                let values1 = [email, password];
                dbPoolInstance.query(queryString1, values1, (err, queryResult) => {
                    if (err) {
                        console.log(err);
                        callback(err, false);
                    }
                    else {
                        if (queryResult.rowCount >= 1) {
                            console.log("User can be created");
                            callback(err, true);
                        }
                        else {
                            console.log("User cannot be created");
                            callback(err, false);
                        }
                    }
                });
            }
            else {
                callback(err, false);
            }
        })
    };

    return {
        create,
        get,
    };
}