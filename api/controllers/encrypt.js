var request = require('request');

var askapi = (hex) => {
  // An object of options to indicate where to post to
  var post_options = {
    url: 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
    headers:
      {
          'content-type':'application/json'
      },
    body: JSON.stringify(hex)
  }
  return new Promise((resolve,reject)=>
    request.post(post_options,(err,res,body)=>
      err ? reject(err) : resolve(body)
    )
  );
};

function check(req, res) {
  var text = req.body.plaintext;
  if(req.headers['content-type'] !== 'application/json' ||
    text === undefined ||
    text === '' ||
    text.length%2 === 1 ||
    !(text.match(/[^0-9a-fA-F]/)===null)
  ) {
    return res.json(400, { "message": "給人看的錯誤說明" });
  }
  if(text.length>32) return res.json(413, { "message": "給人看的錯誤說明" });
  askapi({"plaintext": text})
  .then(val => 
    res.json(200, JSON.parse(val))
  )
  .catch(err => res.send(err))
}

module.exports = {
  check,
}