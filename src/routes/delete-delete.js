let express = require('express');
let router = express.Router();
let db = require('../models/_dbs').db();
const { Periods } = require('../models');

module.exports = app => {
    router.delete('/delete/:id', async (req, res) => {
        console.log('>>>>>>>>>>>>>>>>delete params',req.params)
        try {
            console.log('delete id:', req.params.id)
            await db.transaction(async (t) => {
                await Periods.destroy({
                    where: req.params,
                    transaction: t
                });
            })

            res.json({
                code: 0,
                msg: 'success'
            });
        } catch (e) {
            console.log('delete error:', e)
            res.json({
                code: -1,
                msg: 'failed'
            });
        }
    });
    app.use('/', router);
};
