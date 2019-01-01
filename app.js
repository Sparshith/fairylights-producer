var express = require('express');
var app = express();

const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const topicName = 'test';
const data = JSON.stringify({ state: true });
const dataBuffer = Buffer.from(data);

app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/publish', function (req, res, next) {
  pubsub.topic(topicName).publisher().publish(dataBuffer).then((messageId) => {
    console.log(`Message ${messageId} published.`);
  }).catch((err) => {
    console.log(err);
  });
  res.json({status: 'success'})
})

module.exports = app;
