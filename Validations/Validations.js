const Validator = require('validatorjs');
const errmsg = require('./ErrorMessage');
let Validation_error = require('../Logs/Validation_Error_Logs.json')
let Log_Controllers = require('../Controllers/Log_Controllers')

const List_houses = {
    id: 'numeric',
    title: 'string',
};

const Get_Time_Slots = {
    id: 'numeric',
    property_id: 'numeric',
    realtor_id: 'numeric'
};

const Book_visit = {
    id: 'required|alpha_num',
    name: 'required|string|max:50',
    email: 'required|email',
    phone: 'required|numeric|min:1000000000|max:999999999999999'
};

const validatedata = async (body, option) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        console.log("body : ", (body));
        switch (option) {
            case 'List_houses':
                validation = new Validator(body, List_houses, errmsg.List_houses)
                validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            case 'Get_Time_Slots':
                validation = new Validator(body, Get_Time_Slots, errmsg.Get_Time_Slots)
                validation_result = validation.fails() ? { status: false, message: 'Get_Time_Slots Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            case 'Book_visit':
                validation = new Validator(body, Book_visit, errmsg.Book_visit)
                validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            default: validation_result = { status: false, message: "option cannot be identified" };
        }
        return validation_result;
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/Validation_Error_Logs.json', Validation_error, 'json')
        return { status: false, message: "Internal Server Error Please try Again" };
    }
}


module.exports = { validatedata }








