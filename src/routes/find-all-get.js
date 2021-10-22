let express = require('express');
let router = express.Router();
let db = require('../models/_dbs').db();
const {Op} = require('sequelize');
const {Periods} = require('../models');
import dateformat from 'dateformat'

// todo 验证跨年 跨月
/**
 * 在当前日期基础上加（减）n天
 * @param date
 * @param days
 * @returns {Date}
 */
const add_date = (date, days) => {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    return d
}

/**
 * 获取当月第一天
 * @param date
 * @returns {Date}
 */
const first_day = (date) => {
    let d = new Date(date);
    d.setDate(1)
    return d
}

/**
 * 获取当月最后一天
 * @param date
 * @returns {Date}
 */
const last_day = (date) => {
    let d = new Date(date);
    d.setMonth(d.getMonth() + 1)
    d.setDate(0)
    return d
}

module.exports = app => {
    router.get('/find-all/:sel_date', async (req, res) => {
        console.log('>>>>>>>>>>>>>>>>find-all params', req.params)
        try {
            // let search_start = add_date(req.params.sel_date,-30).getTime()
            // let search_end = add_date(req.params.sel_date,30).getTime()
            let search_start = dateformat(first_day(req.params.sel_date), 'yyyymmdd')
            console.log('>>>>>>>>>>>>>>>>find-all search_start ', search_start)

            let search_end = dateformat(last_day(req.params.sel_date), 'yyyymmdd')
            console.log('>>>>>>>>>>>>>>>>find-all search_end ', search_end)


            let db_periods = await Periods.findAll({
                where: {
                    [Op.and]: [
                        {
                            id: {
                                [Op.and]: {
                                    [Op.gte]: search_start,
                                    [Op.lte]: search_end
                                }
                            }
                        },
                        {
                            [Op.or]: [
                                {
                                    is_start: true
                                },
                                {
                                    is_end: true
                                }
                            ]
                        }
                    ]
                },
                order: [
                    ['id', 'asc']
                ]
            });

            // console.log('period_select db_periods:', db_periods)

            res.json({
                code: 0,
                msg: 'success',
                data: db_periods
            });
        } catch (e) {
            console.log('period_select error:', e)
            res.json({
                code: -1,
                msg: 'failed',
                data: null
            });
        }
    });

    app.use('/', router);
};
