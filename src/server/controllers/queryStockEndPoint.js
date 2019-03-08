const request = require('request');

module.exports = (db) => {

    let get = (req, res) => {
        let apiKey = process.env.API_KEY1;
        let query = req.query.search;
        let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=${apiKey}`;

        request(url, function (error, queryResponse, body) {
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', queryResponse && queryResponse.statusCode); // Print the response status code if a response was received
            res.send(body);
        });
    }

    return {
        get: get
    };
};