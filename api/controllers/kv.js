var URLSafeBase64 = require('urlsafe-base64');

//let now = new Date().toISOString();
//let now = '2017-06-29T07:36:17.653Z';

var key = req => {
  var key = req.path.replace('/kv/','');
  return URLSafeBase64.validate(key) ? key : false;
}

var db = {};

function getKEY(req, res) {
  var usekey = key(req);
  if(!usekey) 
  return res.json(400, { "message": "給人看的錯誤說明" });
  db[usekey]
  ? res.json(200, { 
      VALUE: db[usekey],
      TS: new Date().toISOString(),
    })
  : res.json(404, { "message": "給人看的錯誤說明" })
}

function deleteKEY(req, res) {
  var usekey = key(req);
  if(!usekey) return res.json(400, { "message": "給人看的錯誤說明" });
  var json = {};
  if(db[usekey]) {
    json['OLD_VALUE'] = db[usekey];
    delete db[usekey];
  }
  json['TS'] = new Date().toISOString();
  res.json(200, json)
}

function postKEY(req, res) {
  var usekey = key(req), useval = req.body.VALUE;
  if(useval.match(/^([0-9a-zA-Z+/]{4}|[0-9a-zA-Z+/]{3}=|[0-9a-zA-Z+/]{2}==)+$/)===null || !usekey) {
    return res.json(400, { "message": "給人看的錯誤說明" });
  }
  db[usekey] = req.body.VALUE;
  res.json(200, {
    TS: new Date().toISOString(),
  })
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}