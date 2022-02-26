var express = require("express");
const { Db } = require("mongodb");
var userHelper = require("../helper/userHelper");
var db = require("../config/connection");
const objectId = require("mongodb").ObjectID;

var router = express.Router();
let nw ={}
const verifySignedIn = (req, res, next) => {
  if (nw) {
    next();
  } else {
    res.json({message:'login first'})
  }
};

/* GET home page. */
router.get("/",verifySignedIn, async function (req, res, next) {
  let user = nw
  // console.log('nw id is',nw._id);
 
  let cartCount = null;
  if (user) {
    let userMail = nw.Email;
    cartCount = await userHelper.getCartCount(nw._id);
    console.log("cartCount",cartCount);
    userHelper.getSignedUserProducts(nw.Email).then((response)=>{
      console.log(response);
    })
    
  }
  
  userHelper.getAllProducts().then((products) => {

    
    res.json({admin:false,products,user,cartCount})
  });
});

router.get("/signup", function (req, res) {
  if (req.session.signedIn) {
    res.redirect("/");
  } else {
    res.render("users/signup", { admin: false });
  }
});

router.post("/signup", function (req, res) {
 if(!req.body.Name||!req.body.Email||!req.body.Password){
   res.json({message:"fields require"});
 }
  else{
  userHelper.doSignup(req.body).then((response) => {
    req.session.signedIn = true;
    req.session.user = response;
   
    res.json({message:"set"}).status(200)
  });
}

});

router.get("/signin", function (req, res) {
  if (nw) {
    res.json({user:nw.user})
  } else {
    res.json({message:not})
    
  }
  
});

router.post("/signin", function (req, res) {
  console.log('input is',req.body);

  
  userHelper.doSignin(req.body).then((response) => {
    if (response.status) {
      req.session.signedIn = true;
      req.session.user = response.user;
      // res.redirect("/");
      nw=req.session.user
      console.log("session",req.session.user)
  console.log("ses",req.session);
      res.json({session:req.session}).status(200)
    } else {
      req.session.signInErr = "Invalid Email/Password";
      
      // res.redirect("/signin");
      res.json({message:'Invalid Email/Password'})
    }
  });
});

router.get("/signout", function (req, res) {
  nw.signedIn = false;
  nw.user = null;
  console.log("nw is ",nw);
  nw={}
  res.json({message:'logout success'})
});

router.get("/cart", verifySignedIn, async function (req, res) {
  console.log("nwww",nw);
  let user = nw;
  let userId = nw._id;
  let cartCount = await userHelper.getCartCount(userId);
  let cartProducts = await userHelper.getCartProducts(userId);
  let total = null;
  if (cartCount != 0) {
    total = await userHelper.getTotalAmount(userId);
  }
  res.json({
    admin: false,
    user,
    cartCount,
    cartProducts,
    total,
  })
});

router.get("/add-to-cart/:id",verifySignedIn, function (req, res) {
  console.log("api call");
  let productId = req.params.id;
  let userId = nw._id;
  db.get().collection('products').findOne({_id:objectId(productId)}).then((response)=>{
console.log("cart product",response)
Name=response.Name;
image=response.url;
  })
  userHelper.addToCart(productId, userId,Name,image).then(() => {
    res.json({ status: true });
  });
  // res.json({message:productId,user:userId})
});

router.post("/change-product-quantity", function (req, res) {
  console.log(req.body);
  userHelper.changeProductQuantity(req.body).then((response) => {
    res.json(response);
  });
});

router.post("/remove-cart-product", (req, res, next) => {
  console.log('items recived inthe remove cart is',req.body);
  userHelper.removeCartProduct(req.body).then((response) => {
    res.json(response);
  });
});

router.get("/place-order", verifySignedIn, async (req, res) => {
  let user = nw;
  let userId = nw._id;
  let cartCount = await userHelper.getCartCount(userId);
  let total = await userHelper.getTotalAmount(userId);
  res.json({ admin: false, user, cartCount, total }).status(422);
});


router.post("/place-order", async (req, res) => {
  
  let user = nw;
  let products = await userHelper.getCartProductList(nw._id);
  let totalPrice = await userHelper.getTotalAmount(nw._id);
  let userId =nw._id
  console.log(req.body,user,products,totalPrice,userId);
  userHelper
    .placeOrder(req.body, products, totalPrice, user)
    .then((orderId) => {
      if (req.body.meth === "COD") {
        res.json({ codSuccess: true });
        // res.json(orderId)
      } else {
        res.json({message:'waiting'})
      }
    });
  
});
router.post("/delete",verifySignedIn,function(req,res,next){
  let userId=nw._id;
  userHelper.delet(userId).then((result)=>{
    
    console.log(result);
    res.json(result)
  })
  
  
})
router.post("/verify-payment", async (req, res) => {
  console.log(req.body);
  userHelper
    .verifyPayment(req.body)
    .then(() => {
      userHelper.changePaymentStatus(req.body["order[receipt]"]).then(() => {
        res.json({ status: true });
      });
    })
    .catch((err) => {
      res.json({ status: false, errMsg: "Payment Failed" });
    });
});

router.get("/order-placed", verifySignedIn, async (req, res) => {
  let user = req.session.user;
  let userId = req.session.user._id;
  let cartCount = await userHelper.getCartCount(userId);
  res.render("users/order-placed", { admin: false, user, cartCount });
});

router.get("/orders", verifySignedIn, async function (req, res) {
  let user = nw;
  let userId = nw._id;
  let cartCount = await userHelper.getCartCount(userId);
  let orders = await userHelper.getUserOrder(userId);
  res.json( { admin: false, user, cartCount, orders });
});

router.get(
  "/view-ordered-products/:id",
  verifySignedIn,
  async function (req, res) {
    let user = req.session.user;
    let userId = req.session.user._id;
    console.log
    let cartCount = await userHelper.getCartCount(userId);
    let orderId = req.params.id;
    let products = await userHelper.getOrderProducts(orderId);
    res.render("users/order-products", {
      admin: false,
      user,
      cartCount,
      products,
    });
  }
);

router.get("/cancel-order/:id", verifySignedIn, function (req, res) {
  let orderId = req.params.id;
  userHelper.cancelOrder(orderId).then(() => {
    res.redirect("/orders");
  });
});
// Add Product Get

router.get('/addproduct',verifySignedIn,(req,res)=>{
  console.log("user",req.session.user);
  res.render('users/user-add-product')
})
router.post('/addproduct',verifySignedIn,(req,res)=>{
  // console.log(req.body);
  console.log(req.body);
  let user= nw

  
  userHelper.addProduct(req.body,user).then((response)=>{
    res.json({response:response,vibe:true})
  })
  
})
// router.post('/add-to-wishlist/:id',async(req,res)=>{
//   let productId =req.params.id
//   console.log(productId);
//   let userId = nw._id
// await userHelper.addToWishlist(productId,userId).then((response)=>{
//   res.json({message:response})
// })

  
// })

// router.get('/wishlist',(req,res)=>{
//   userHelper.getWishListItems(nw._id).then((items)=>{
//     res.json({message:items})
//   })
  
// })

router.get('/chat/:id',verifySignedIn,(req,res)=>{
 const expected = req.params.id
 const user=nw

  userHelper.getall(user,expected).then((response)=>{
    res.json({message:response})
  })
 
})
router.get('/chat1/:id',verifySignedIn,(req,res)=>{
  const expected = req.params.id
  const user=nw
 
   userHelper.getOne(user,expected).then((response)=>{
     res.json({message:response})
   })
  
 })
router.post('/chat',verifySignedIn,async(req,res)=>{
  
const user=nw
console.log(req.body);

// const isReaded=await userHelper.getIsReaded()
// console.log('isReaded'+isReaded.length);
//  let allMessages = await db.get().collection('chat').find({reciver:user.Email,sender:'abhinchand@gmail.com'}).toArray();
userHelper.sendChat(user,req.body).then((result)=>{
  
  res.json({message:result})
 
})

})

router.get('/userDetails',(req,res)=>{
  let userId = nw._id
  userHelper.getUserDetails(userId).then((response)=>{
    res.json({message:response})
  })
  
})
router.get('/userOrderItems',verifySignedIn,(req,res)=>{
 const  userId =nw._id
 console.log("ddff",userId,nw);
  userHelper.getUserOrder(userId).then((response)=>{
    console.log("userOrder",response);
    res.json({message:response})
  })
  
  
})

router.post("/search", verifySignedIn, async function (req, res) {
  let user = req.session.user;
  let userId = req.session.user._id;
  let cartCount = await userHelper.getCartCount(userId);
  userHelper.searchProduct(req.body).then((response) => {
    res.render("users/search-result", { admin: false, user, cartCount, response });
  });

  // Add product
 
});
router.get('/viewService', function(req,res){
  db.get().collection('service').find().toArray().then((service)=>{
    res.json({service})
  })
})
router.get('/messages',verifySignedIn,function(req,res,next){
  let user=nw;
  console.log("new",nw)
  userHelper.getmessages(user).then((msg)=>{
    console.log("imad",msg)
    res.json(msg)
  })
})

module.exports = router;
