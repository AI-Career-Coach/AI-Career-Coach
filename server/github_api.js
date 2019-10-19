var GitHub = require('github-api');
var request = require('request');
const {GITHUB_TOKEN} = require('../secrets')
 
// basic auth
var gh = new GitHub({
      token: GITHUB_TOKEN
});

const this_User = {}

// function request_url(url){
//   request({
//     "uri": url,
//     "method": "GET",
//   }, (err, res, body) => {
//     if (!err) {
//       // console.log(res)
//     } else {
//       console.error("Unable to send message:" + err);
//     }
//   })
// }

function round_to_precision(x, precision) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

function github_info(github_username){
  var user = gh.getUser(github_username);
  let allURLS = []
  let allRepos = []
  user.listRepos(function(err, repos) {
    // console.log(err)
      let length = repos.length
       for(i=0;i<length;i++){
         // console.log(repos[i].languages_url)
         allURLS.push(repos[i].languages_url)
         // request_url(repos[i].languages_url)
       }
      // console.log(allURLS, "THE URLS")
    })
    allURLS.forEach(function (url, index) {
      if(index==1){
      // console.log(url)
      // console.log(item, index);
        request.get({
          url: url,
          headers: {
            'User-Agent': 'request'
          }
        }, (err, res, data) => {
          if (err) {
            console.log('Error:', err);
          } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
          } else {
            // data is already parsed as JSON:
            console.log(typeof data);
             console.log(data["JavaScript"])
          }
      });
    }
    })
    let total_Bytes = 0
    Object.keys(this_User).forEach(function(key) {
      total_Bytes += this_User[key]
    })
    Object.keys(this_User).forEach(function(key) {
      this_User[key] = 100*round_to_precision(this_User[key]/total_Bytes, 0.01)
    })
    // console.log(this_User)
  return this_User
}

module.exports = { github_info };
