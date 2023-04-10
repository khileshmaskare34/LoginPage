var express = require('express');
const passport = require('passport');
const users = require('./users');
var router = express.Router();

const userModel = require("./users");
const localStoragy = require("passport-local");
passport.use(new localStoragy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
let name1;

// router.get('/profile',isLoggedIn, function(req, res, next) {
//   res.render('/profile');
// });

router.get('/profile', function(req, res, next) {
  res.send(`profile ${req.params.username}`);
});


router.post('/register', function(req, res, next){
  var newUser = new users({
    name : req.body.name,
    username: req.body.username
    
    // password : req.body.password
  })
  users.register(newUser, req.body.password)
  .then(function(u){
    password.athenticate('local')(req, res, function(){
      res.redirect('/profile')
    })
  })
  .catch(function(e){
    res.send(e);
  })
});

router.get('/read', function(req, res, next){
  userModel .find({
  }).then(function(alluser){
    res.send(alluser);
  })
})

router.post('/login', passport.authenticate('local',{
  successRedirect: "/profile",
  failureRedirect: "/login"
  
}


), function(req, res){
  
} )


router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    
    return next();
  }
  else{
    res.redirect('/login');
  }
}
module.exports = router;


















// var express = require('express');
// const passport = require('passport')
// var router = express.Router();


// const userModel = require("./users")
// const localStrategy = require("passport-local");
// const users = require('./users');
// passport.use(new localStrategy(userModel.authenticate())); 


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// router.get('/profile',isLoggedIn,function(req,res,next){
//   res.send("profile page hey welocome in our company");
// });
// router.post('/register', function(req, res, next) {
//   var newUser = new users({
//     name:req.body.name,
//     username:req.body.username,
//     password:req.body.password
                                   
//   })

//   users.register(newUser, req.body.password)
//   .then(function(u){
//     passport.authenticate('local')(req,res,function(){
//       res.redirect('/profile')
//     })
//   })

// });

// router.post('/login',passport.authenticate('local',{
//   successRedirect:'/profile',
//   failureRedirect:'/login'
// }),function(req,res,next){  }
// )


// router.post('/logout',function(req,res){
//   req.logout(function(err){
//     if(err){return next(err);}

//     res.redirect('/');
//   })
// })
  
// function isLoggedIn(req,res,next ){
//   if(passport.authenticate()){
//     return next();
//   }
// }

// module.exports = router;