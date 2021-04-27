let express = require('express');
let router = express.Router();

router.get('/',(req, res,next) => {
    if((req.query.category) == null || isNaN(req.query.category)) {
        req.query.category = 0;
    }
    if((req.query.brand) == null || isNaN(req.query.brand)) {
        req.query.brand = 0;
    }
    if((req.query.color) == null || isNaN(req.query.color)) {
        req.query.color = 0;
    }
    if((req.query.min) == null || isNaN(req.query.min)) {
        req.query.min = 0;
    }
    if((req.query.max) == null || isNaN(req.query.max)) {
        req.query.max = 100;
    }
    if((req.query.sort == null))
    {
        req.query.sort = 'name';
    }
    if((req.query.limit == null) || isNaN(req.query.limit))
    {
        req.query.limit = 9;
    }
    if((req.query.search == null) || (req.query.search.trim()== ''))
    {
        req.query.search = '';
    }
    if((req.query.page == null) || isNaN(req.query.page))
    {
        req.query.page = 1;
    }
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll(req.query)
        .then(data => {
            //console.log(data);
            res.locals.categories = data;
            let brandController = require('../controllers/brandController');
            return brandController.getAll(req.query);
        })
        .then(data => {
            res.locals.brands = data;
            let colorcontroller = require('../controllers/colorController');
            return colorcontroller.getAll(req.query);
            
        })
        .then(data => {
            //console.log(data);
            res.locals.colors = data;
            let productcontroller = require('../controllers/productController');
            return productcontroller.getAll(req.query);
            
        })
        .then(data => {
            
            res.locals.products = data.rows;

            //console.log(data);
            res.locals.pagination = {
                page: parseInt(req.query.page),
                limit: parseInt(req.query.limit),
                totalRows: data.count
            }
            res.render('category', {banner: 'category'});
            //console.log(data);
            res.render('category');
        })
        .catch(error=> next(error));
    
})

router.get('/:id',(req, res,next) => {
    console.log('Test param: ' + req.params.id); // "Test param: foo"
    let productcontroller = require('../controllers/productController');
    productcontroller
        .getById(req.params.id)
        .then(product => {
            //console.log(product.Reviews);
            
            res.locals.product=product;
            res.render('singleproduct');
        })
        .catch(error=> next(error));
})

module.exports = router;