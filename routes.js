var  adminResource = require('./server/controllers/admin.controller');

function setup(app) {
    console.log('ddddddddddddddddddd')
    app.get('/api/carecomponant/category/', adminResource.getCategories);
    app.get('/api/carecomponant/category/:CategoryID',adminResource.getCategory);
    app.post('/api/carecomponant/category/', adminResource.CreateOrModifyCategory);
}

exports.setup = setup;
