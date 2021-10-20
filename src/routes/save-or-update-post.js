import * as R from 'ramda'
let express = require('express');
let router = express.Router();
let db = require('../models/_dbs').db();
const { Periods } = require('../models');

module.exports = app => {
    router.post('/save-or-update', async (req, res) => {
        console.log('>>>>>>>>>>>>>>>>save-or-update body',req.body)
        try {
            let period = req.body
            period.state = R.join('|', period.state)

            console.log('save-or-update period:', period)

            let db_period = await Periods.findOne({
                where: { id: period.id }
            });

            if(db_period === null){ //新增
                console.log('===========create===========')
                await db.transaction(async (t) => {
                    await Periods.create(period, {transaction: t});
                })
            }else{ //更新
                console.log('============update==========')
                await db.transaction(async (t) => {
                    await Periods.update(period, {
                        where: {
                            id: db_period.id
                        },
                        transaction: t
                    });
                })
            }

            console.log('save-or-update done')

            res.json({
                code: 0,
                msg: 'success'
            });
        } catch (e) {
            console.log('save-or-update error:', e)
            res.json({
                code: -1,
                msg: 'failed'
            });
        }
    });
    app.use('/', router);
};
