let express = require('express');
let router = express.Router();
let db = require('../models/_dbs').db();
const { Periods } = require('../models');

module.exports = app => {
    router.get('/find-one/:id', async (req, res) => {
        console.log('>>>>>>>>>>>>>>>>find-one params',req.params)
        try {
            let period = await Periods.findOne({
                where: req.params
            });

            // console.log('find-one period:', period)

            res.json({
                code: 0,
                msg: 'success',
                data: period
            });
        } catch (e) {
            console.log('find-one error:', e)
            res.json({
                code: -1,
                msg: 'failed',
                data: null
            });
        }
    });

    app.use('/', router);
};
