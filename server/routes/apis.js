const express = require('express');
const router = express.Router();
const {
	UserController,
	DriverController,
	ProductController,
	ShopController,
	PaymentController,
} = require('../src/Controller/v1/index');
const { userSignup } = require('../src/Request');
const {
	UserAuth,
	cross,
	Language,
	AuthSkip,
} = require('../src/middleware/index');
const Apiresponse = require('../libary/ApiResponse');
const user = new UserController();

router.use([cross, Language, AuthSkip, UserAuth]);
router.get('/', function (req, res) {
	res.send(' APi workings ');
});

router.post('/user', userSignup, Apiresponse(user.addUser));
router.post('/user/login', Apiresponse(user.loginUser));
router.post('/user/verify', Apiresponse(user.verifyOtp));
router.post('/user/edit/', Apiresponse(user.updateProfile));
router.put('/user/bank-account-update', Apiresponse(user.updateBankAccount));
router.post('/change_password', Apiresponse(user.changePassword));
router.post('/forgot-password', Apiresponse(user.forgotPassword));
router.post('/logout', Apiresponse(user.logout));
router.get('/app-information', Apiresponse(user.appInfo));
router.get('/shops/:offset([0-9]+)', Apiresponse(ShopController.getShop));
router.post('/order', Apiresponse(ShopController.orderHoohuk));
router.get('/order/:offset([0-9]+)', Apiresponse(ShopController.myOrders));
router.get(
	'/order-details/:order_id([0-9]+)',
	Apiresponse(ShopController.orderDetails)
);
router.post('/do-payment', Apiresponse(ShopController.doPayment));
router.post('/accept-order', Apiresponse(ProductController.OrderAccept));
router.post('/complete-order', Apiresponse(DriverController.CompleteOrders));
router.post('/track-driver', Apiresponse(DriverController.TrackDriver));
router.get('/check-balance', Apiresponse(ShopController.currentBalance));
router.get(
	'/product-detail/:product_id([0-9]+)',
	Apiresponse(ProductController.productDetails)
);
router
	.route('/products/:offset([0-9]+)?/')
	.get(Apiresponse(ProductController.getProduct))
	.post(Apiresponse(ProductController.addProduct))
	.put(Apiresponse(ProductController.updateProduct))
	.delete(Apiresponse(ProductController.deleteProduct));
router
	.route('/rating/:offset([0-9]+)?/')
	.get(Apiresponse(ShopController.getReview))
	.post(Apiresponse(ShopController.giveRating));
router
	.route('/stripe-integration/:user_id([0-9]+)')
	.get(PaymentController.stripeHook)
	.post(PaymentController.stripeHook);
router.get(
	'/stripe-link-account',
	Apiresponse(PaymentController.stripeAccountLink)
);
router.post(
	'/stripe-secert-key',
	Apiresponse(PaymentController.createStripeSecert)
);
module.exports = router;
