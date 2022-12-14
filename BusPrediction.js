const http = require('https');
var moment = require('moment');

exports.handler = async (event) => {
    return httprequest().then((data) => {
        //return data;
        return getStatus(data);
    });
};

function getStatus(busdata) {
    var result = JSON.parse(JSON.stringify(busdata));    
    var arrival_time = busdata.data.map(x=> x.attributes)[0].arrival_time;
    var current_time = new Date();    
    var seconds =  arrival_time - current_time;    
    return CreateResponse(seconds);    
}


function CreateResponse(status) {
   const response = {
        sessionAttributes: {},
        dialogAction: {
            type: 'Close',
            fulfillmentState: 'Fulfilled',
            message: {
            contentType: "PlainText",
            content: status
        }
      }
    }
    
    return response;
}

function httprequest() {
     return new Promise((resolve, reject) => {
        const options = {
            host: 'api-v3.mbta.com',
            path: '/predictions?page[offset]=0&page[limit]=2&filter[direction_id]=0&filter[route_type]=3&filter[stop]=2023&filter[route]=71',
            port: 443,
            method: 'GET'
        };
        const req = http.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}
