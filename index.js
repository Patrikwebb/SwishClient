var fs = require('fs');
var https = require('https');

// Cert and key file
// caFile = fs.readFile('/etc/ssl/certs/ca-certificates.crt', function(err, data) {
//   if (err){ console.log(err);
//   } else { console.log("caFile found");
//   }
// });

certFile = fs.readFile('./ssl/clientcertTest.pem', function(err, data) {
  if (err){ console.log(err);
  } else { console.log("certFile found");
  }
});

keyFile = fs.readFile('./ssl/keyTest.key', function(err, data) {
  if (err){ console.log(err);
  } else { console.log("keyFile found\n");
  }
});

var options = {
    hostname: 'mss.swicpc.bankgirot.se',
    port: 443,
    path: '/swish-cpcapi/api/v1/paymentrequests',
    method: 'POST',
    // ca: caFile,
    cert: certFile,
    passphrase: 'swish',
    key: keyFile,
  };

options.agent = new https.Agent(options);

var req = https.request(options, function(res) {

    console.log("<---Res.statusCode--->\n> " + res.statusCode);
    console.log("<---Res.headers--->\n> " + res.headers);

    res.on('data', function(data) {
        process.stdout.write("<<----Process.stdout---->>\n " + data);
    });
});

req.on('error', function(err) {
    console.error("<<<----Error----->>> \n" + err);
});

req.write("Hello Swish!");
req.end();
