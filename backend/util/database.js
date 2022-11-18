const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;

let _db;

const mongodbConnect = callback => {
  mongodbClient.connect(
    "mongodb+srv://matanfadida:OoJFchkVZajEpF21@cluster0.v7qxqtj.mongodb.net/restaurnt?retryWrites=true&w=majority"
  )
    .then(client => {
        console.log('Connect!')
        _db = client.db();
        callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if(_db){
    return _db
  }
  throw 'No database found !'
}

exports.getDb = getDb;
exports.mongodbConnect = mongodbConnect;