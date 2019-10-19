/* eslint-disable camelcase */
const router = require('express').Router();
const request = require('request');
const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = require('../secrets');
const { offerQuiz, sendQuiz } = require('./language_quizzes');
const { github_info } = require('./github_api');

// Creates the endpoint for our webhook
router.post('/', (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      // console.log(webhook_event);
      let sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
router.get('/', (req, res) => {
  // Your verify token. Should be a random string.
  // let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  let justAskedGithubUsername = true;
  let message_payload;
  // Check if the message contains text
  if (received_message.text) {
    if (received_message.text === 'quiz') {
      message_payload = offerQuiz();
    } else {
      github_info('tjhelsel');
      // If input github_username\
      // Return github_username
      message_payload = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'What do you want to do next?',
            buttons: [
              {
                type: 'web_url',
                url: 'https://www.messenger.com',
                title: 'Visit Messenger'
              }
            ]
          }
        }
      };
    }
  }
  // Sends the response message
  callSendAPI(sender_psid, message_payload);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  callSendAPI(sender_psid, sendQuiz(received_postback.payload));
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, message_body) {
  // Construct the message body
  const request_body = {
    recipient: {
      id: sender_psid
    },
    message: message_body
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log('message sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    }
  );
}
