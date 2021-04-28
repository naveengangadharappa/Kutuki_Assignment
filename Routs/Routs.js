const express = require('express');
const router = express.Router();
const validationschema = require('../Validations/Validations');
const Controllers = require('../Controllers/Controllers')
const Log_Controllers = require('../Controllers/Log_Controllers')
const { ErrorHandler } = require('../Errors/errors');

let Rout_model_error = require('../Logs/Routs_Error_Logs.json')


router.get('/', (req, res) => {
    res.json({ message: "Connected to Node Api server for Kutuki Assignment. " });
})

router.post('/List_houses', async (req, res) => {
    try {
        let validation_result = await validationschema.validatedata(req.body, 'List_houses')
        if (validation_result.status) {
            let result = await Controllers.Get_House_List(req.body);
            res.json(result);
        } else {
            res.json(validation_result);
        }
    } catch (error) {
        console.log(error);
        error_result = await Log_Controllers.LogError('myId', error, './Logs/Routs_Error_Logs.json', Rout_model_error, 'json')
        res.json({ status: false, message: 'Internal error request cannot be completed' })
    }
})

router.post('/Get_Time_Slots', async (req, res) => {
    try {
        let validation_result = await validationschema.validatedata(req.body, 'Get_Time_Slots')
        if (validation_result.status) {
            let result = await Controllers.Get_Available_Timeslot(req.body);
            res.json(result);
        } else {
            res.json(validation_result);
        }
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/Routs_Error_Logs.json', Rout_model_error, 'json')
        res.json({ status: false, message: 'Internal error request cannot be completed' })
        //throw new ErrorHandler(404, 'Internal error request cannot be completed');
    }
})

router.post('/Book_visit', async (req, res) => {
    try {
        let validation_result = await validationschema.validatedata(req.body, 'Book_visit')
        if (validation_result.status) {
            let result = await Controllers.Book_Timeslot(req.body);
            res.json(result);
        } else {
            res.json(validation_result);
        }
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/Routs_Error_Logs.json', Rout_model_error, 'json')
        res.json({ status: false, message: 'Internal error request cannot be completed' })
        //throw new ErrorHandler(404, 'Internal error request cannot be completed');
    }
})


module.exports = router;