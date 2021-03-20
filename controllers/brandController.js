let controller = {};
let models = require('../models');
let Brand = models.Brand;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Brand
            .findAll({ 
                include: [{model: models.Product}],
                attributes: ['id','name','imagepath']
                
            })
            .then(data => resolve(data))
            .catch(error => reject(new  Error(error)));
    })
}

module.exports = controller;