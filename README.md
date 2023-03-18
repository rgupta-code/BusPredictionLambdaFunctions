# LambdaFunctionForBusPrediction
This code is a Node.js AWS Lambda function that retrieves data from the MBTA API (Massachusetts Bay Transportation Authority) and calculates the time difference between the current time and the arrival time of the next bus on route 71 at stop 2023.

The http module from the Node.js standard library is used to send a GET request to the MBTA API endpoint to retrieve predictions for the next two arrivals of route 71 at stop 2023. The moment module is used for date manipulation.

The exports.handler function is the main entry point for the Lambda function, and it is an asynchronous function that returns a Promise. This function calls the httprequest function, which returns a Promise that resolves with the bus data from the API. When the Promise is resolved, the getStatus function is called with the bus data as a parameter, which calculates the time difference in seconds between the arrival time and the current time using the arrival_time attribute of the first prediction in the data array returned by the MBTA API.

Finally, the CreateResponse function is called with the calculated time difference as a parameter, and it returns an object that contains a plain text message with the time difference. This object is used to construct the response that the Lambda function returns to the caller.
