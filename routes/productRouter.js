let express = require('express');
let router = express.Router();

router.get('/',(req, res) => {
    let categoryController = require('../controllers/categoryController');
    categoryController
        .getAll()
        .then(data => {
            console.log(data);
            res.locals.categories = data;
            res.render('category');
        })
    
})

router.get('/:id',(req, res) => {
    res.render('singleproduct');
})

module.exports = router;