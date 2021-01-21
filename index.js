let express = require('express');
let app = express();

//statically
app.use(express.static(__dirname + '/public'));

// View Engine
var expressHbs = require('express-handlebars');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//cac routes
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/:page', function(req, res) {
    let banners = {
        blog :'Out Blog',
        category :'Shop Category',
        cart: 'Shopping Cart',
        singleproduct: 'Shop Single',
        checkout: 'Product Checkout',
        confirmation: 'Order Confirmation',
        tracking_order: 'Order Tracking',
        single_blog: 'Blog Details',
        register: 'Register',
        login: 'Login / Register',
        contact: 'Contact Us',
        confirmation: 'Order Confirmation'
    };
    let page = req.params.page;
    //console.log(banners[page]);
    res.render(page,{banner: banners[page]});
})

//start server
app.set('port',process.env.PORT || 5000)
app.listen(app.get('port'),()=>{
    console.log('listening on port '+app.get('port'));
});