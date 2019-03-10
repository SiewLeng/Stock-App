const request = require('request');

module.exports = (db) => {
    let get = (request, response) => {
        let email = request.query.search;

        db.user.get(email, (error, queryResult) => {
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            else {
                response.send(queryResult.rows);
            }
        })
    };

    let create = (request, response) => {
        let email = request.body.email;
        let password = request.body.password;

        db.user.create(email, password, (error, userCreated) => {
            if (error) {
                console.error('error getting user:', error);
                response.sendStatus(500);
            }
            else {
                response.send(userCreated);
            }
        })
    }

    return {
        create: create,
        get: get
    };
};