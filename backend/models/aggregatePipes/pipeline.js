[{
  $match: {

    "address.country_code": "CA"
  }
}, {
  $group: {
    _id: "$bedrooms",
    avgPrice: {
      $avg: "$price"
    }
  }
}, {
  $sort: {
    _id: -1
  }
}]



[{
  '$match': {
    'address.country_code': 'CA'
  }
}, {
  '$group': {
    '_id': '$bedrooms',
    'avgPrice': {
      '$avg': '$price'
    }
  }
}, {
  '$sort': {
    '_id': -1
  }
}]



/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const agg = [{
  '$match': {
    'address.country_code': 'CA'
  }
}, {
  '$group': {
    '_id': '$bedrooms',
    'avgPrice': {
      '$avg': '$price'
    }
  }
}, {
  '$sort': {
    '_id': -1
  }
}];

MongoClient.connect(
  '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('').collection('');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });


  // [{
  //   '$match': {
  //     'productCode': '120'
  //   }
  // }, {
  //   '$group': {
  //     '_id': '$productCode',
  //     'avgPrice': {
  //       '$avg': '$productPrice'
  //     }
  //   }
  // }]