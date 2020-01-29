// Dependencies fo rexpress, mongoose, body parser
const express = require('express');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var macaddress = require('macaddress'); // ipvar
const nodemailer = require('nodemailer'); // Mailer Package

// Seeting mail instances
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'athavan19794@gmail.com',
    pass: 'Athavan61*'
  },
  tls: {
    rejectUnauthorized: false
  }
});



const config = require('./authConfig/config')
const UserRregistration = require('./models/UserRegistration');
const addProduct = require('./models/product')
// Variabl for express
const app = express();

// Connection to mongodb local
mongo.set('useCreateIndex', true);
mongo.set('useNewUrlParser', true);
mongo.set('useUnifiedTopology', true);

// mongodb+srv://Athavan:<password>@mycluster-8vjh9.mongodb.net/test?retryWrites=true&w=majority
// `mongodb+srv://${config.username}:${dbpass}@${config.host}/${config.dbName}?retryWrites=true&w=majority`
mongo.connect(`mongodb+srv://Athavan:Athavan61*@mycluster-8vjh9.mongodb.net/shade6?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

//Body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Adding headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  //Without calling next() it'll not run
  next();
});

// getpatrole getting patient role
app.get("/", (req, res, next) => {
  res.json({
    message: "Home from learnMean"
  });
});


// Getting mac address
app.get('/getip', (req, res, next) => {
  macaddress.all(function (err, all) {
    // console.log(JSON.stringify(all.Ethernet, null, 2));
    // res.json({
    //   all
    // });
    if (all != null || all != '') {
      res.status(201).json({
        msg: 'Ip got successfully',
        detail: all.Ethernet
      });
    } else {
      res.status(201).json({
        msg: 'Ip get failed',
        detail: null
      });
    }
  });
});


// Registering user
app.post('/register', (req, res, next) => {
  console.log(req.body)
  const registerUser = new UserRregistration({
    displayName: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isActive: true
  });
  UserRregistration.findOne({
    email: req.body.email
  }).then(docs => {
    // console.log(docs);
    if (docs === null) {
      registerUser.save().then(rest => {
        console.log('User registered successfully');
        res.status(201).json({
          msg: 'User registered',
          detail: rest
        });

        // Setting Address to send mail
        let SendTo = {
          from: 'athavan19794@gmail.com',
          to: req.body.email,
          subject: 'Registration',
          text: `User registered successfully: \n
                your OTP: ${req.body.otp}\n`
        };
        // Sending the mail
        transporter.sendMail(SendTo).then(error => {
          console.log(`Mail has been send to: \n ${SendTo.to}`);
        }).catch(error => {
          console.log(`Can not send mail to: ${SendTo.to}`);
          console.log(`Because ${error}`);
        });
      }).catch(err => {
        res.json({
          msg: 'Can not add'
        });
        console.log(`Could not insert ${err}`);
      });
    } else {
      res.status(201).json({
        msg: 'User already exist',
        detail: docs
      });
    }
  }).catch(err => {
    console.log(err);
  })
});

// Fetch user
app.post('/getuser', (req, res, next) => {
  console.log(req.body)
  UserRregistration.findOne({
    email: req.body.email,
    password: req.body.password,
  }).then(docs => {
    if (docs != null) {
      res.status(201).json({
        msg: 'User fetched',
        detail: docs
      });
    } else {
      res.status(201).json({
        msg: 'User not exist',
        detail: ''
      });
    }
  }).catch(err => {
    console.log(err);
  })
});


// // Getting otp
// app.post('/getOtp', (req, res, next) => {
//   // console.log(req.body);
//   UserRregistration.findOne({
//     email: req.body.userEmail,
//     otp: req.body.userOTP
//   }).then(docs => {
//     // console.log(docs);
//     if (docs === null) {
//       res.status(201).json({
//         msg: 'Otp incorrect',
//         detail: null
//       });
//     } else {
//       res.status(201).json({
//         msg: 'Otp veryfied',
//         detail: docs
//       });
//     }
//   }).catch(err => {
//     console.log(err);
//   })
// });


// // Getting mac and email if already registered
// app.post('/getMacEmail', (req, res, next) => {
//   // console.log(req.body);
//   UserRregistration.findOne({
//     email: req.body.email,
//     ip: req.body.mac
//   }).then(docs => {
//     // console.log(docs);
//     if (docs === null) {
//       res.status(201).json({
//         msg: 'not registered',
//         detail: null
//       });
//     } else {
//       res.status(201).json({
//         msg: 'already registered',
//         detail: docs
//       });
//     }
//   }).catch(err => {
//     console.log(err);
//   });
// });

// // Logout user
// app.post('/deleteUser', (req, res, next) => {
//   // console.log(req.body);
//   UserRregistration.deleteOne({
//     email: req.body.mail,
//     ip: req.body.mac
//   }).then(docs => {
//     // console.log(docs);
//     if (docs === null) {
//       res.status(201).json({
//         msg: 'user not available',
//         detail: null
//       });
//     } else {
//       res.status(201).json({
//         msg: 'deleted',
//         detail: docs
//       });
//     }
//   }).catch(err => {
//     console.log(err);
//   });
// });

// Registering user
app.post('/add-product', (req, res, next) => {
  console.log(req.body)
  const product = new addProduct({
    productId: req.body.prodId,
    productCode: req.body.prodCode,
    productName: req.body.prodName,
    productCategory: req.body.prodCategory,
    productPrice: req.body.prodPrice,
    productStock: req.body.prodStock,
    storeCode: req.body.storeCode,
  });
  addProduct.findOne({
    productCode: req.body.prodCode
  }).then(docs => {
    // console.log(docs);
    if (docs === null) {
      product.save().then(rest => {
        console.log('Product added successfully');
        res.status(201).json({
          msg: 'Product added',
          detail: rest
        });
      }).catch(err => {
        res.json({
          msg: 'Can not add'
        });
        console.log(`Could not insert ${err}`);
      });
    } else {
      res.status(201).json({
        msg: 'Product already exist',
        detail: docs
      });
    }
  }).catch(err => {
    console.log(err);
  })
});

// Get all products
app.post('/products', (req, res, next) => {
  // console.log(req.body)
  addProduct.find({}).then(docs => {
    console.log(docs);
    if (docs != null) {
      console.log('Product fetched successfully');
      res.status(201).json({
        msg: 'Product fetched successfully',
        detail: docs
      });
    } else {
      res.status(201).json({
        msg: 'No products found',
        detail: ''
      });
    }
  }).catch(err => {
    console.log(err);
  })
});


// Get products by name aggregate
app.post('/productsbyname', (req, res, next) => {
  // console.log(req.body.product_name)
  // ${req.bodyproduct_name}
  addProduct.aggregate(
    [{
      '$match': {
        'productCode': req.body.product_name
      },
    }],
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.status(201).json({
          msg: 'Aggregate successful',
          detail: results
        });
      }
    }
  );
});

// Get products by group aggregate for average price
app.post('/productsavg', (req, res, next) => {
  // console.log(req.body.product_name)
  addProduct.aggregate(
    [{
      '$group': {
        '_id': '$productCode',
        'avgPrice': {
          '$avg': '$productPrice'
        }
      }
    }],
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.status(201).json({
          msg: 'Aggregate avg successful',
          detail: results
        });
      }
    }
  );
});

module.exports = app;
