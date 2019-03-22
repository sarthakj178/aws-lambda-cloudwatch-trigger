var zlib = require('zlib');

/**
 * Dummy Function just to write logs to CloudWatch
 * Sample Input - 
 *  {
 *      "type": "ERROR",
 *      "message": "Sample Error Event"
 *  }
 */
exports.write_log = function (event, context, callback) {
    console.log("[" + event.type + "]: " + event.message);
    callback(null);
}

// Function which receives events from CloudWatch when the filter matches and currently does nothing. 
// We can take actions like sending an email, creating an alarm etc.
exports.take_action_on_error = function (event, context, callback) {
    console.log("Event received", event);
    var payload = new Buffer(event.awslogs.data, 'base64');
    zlib.gunzip(payload, function(e, result) {
        if (e) { 
            context.fail(e);
        } else {
            result = JSON.parse(result.toString('ascii'));
            console.log("Event Data:", JSON.stringify(result, null, 2));
            context.succeed();
        }
    });
}