const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;

const mongodbConnect = async (callback) => {
  mongodbClient.connect(
    "mongodb+srv://matanfadida:OoJFchkVZajEpF21@cluster0.v7qxqtj.mongodb.net/?retryWrites=true&w=majority"
  )
    .then(result => {
        console.log('Connect!')
        callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongodbConnect;