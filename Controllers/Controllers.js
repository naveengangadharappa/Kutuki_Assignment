const updateJsonFile = require('update-json-file')
let houses_model = require('../Models/houses.json')
let owners_model = require('../Models/owners.json')
let realtor_model = require('../Models/realtor.json')
let tenent_model = require('../Models/tenent.json');
let houses_visit_availability_model = require('../Models/house_visit_availability.json')

let Controller_model_error = require('../Logs/Controller_Error_Logs.json')
let Log_Controllers = require('../Controllers/Log_Controllers')

const update_json_file = async (file_path, item) => {
    try {
        updateJsonFile(file_path, (data) => {
            data = item;
            return data;
        })
        return { status: true };
    } catch (err) {
        console.log(err);
        return { status: false, message: "err at updating Json File" };
    }
}

const Get_House_List = async (req_data) => {
    let error_result = {};
    try {
        let house_list_result = {};
        let filter = req_data.filter ? req_data.filter : '';
        switch (filter) {
            case "id":
                house_list_result = { status: true, data: houses_model.filter(data => data.id == req_data.id) };
                break;
            case "title":
                house_list_result = { status: true, data: houses_model.filter(data => data.title.includes(req_data.title)) };
                break;
            default: house_list_result = { status: true, data: houses_model };
        }
        return house_list_result;
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/DB_Error_Logs.json', DB_model_error, 'json')
        return { status: false, message: "Internal Server Error Please try Again" };
    }
}

const Get_Available_Timeslot = async (req_data) => {
    let error_result = {};
    try {
        let Timeslots_result = {};
        let filter = req_data.filter ? req_data.filter : '';
        switch (filter) {
            case "id":
                if (req_data.id) Timeslots_result = { status: true, data: houses_visit_availability_model.filter(data => (data.status == "AVAILABLE" && !data.realtor_id && data.id == req_data.id)) };
                else Timeslots_result = { status: false, message: "Id required please pass id" }
                break;
            case "property_id":
                if (req_data.property_id) Timeslots_result = { status: true, data: houses_visit_availability_model.filter(data => (data.status == "AVAILABLE" && !data.realtor_id && data.property_id == req_data.property_id)) };
                else Timeslots_result = { status: false, message: "property_id required please pass property_id" }
                break;
            case "day_of_week":
                if (req_data.day_of_week) Timeslots_result = { status: true, data: houses_visit_availability_model.filter(data => (data.status == "AVAILABLE" && !data.realtor_id && data.day_of_week == req_data.day_of_week)) };
                else Timeslots_result = { status: false, message: "day_of_week required please pass property_id" }
                break;
            default: Timeslots_result = { status: true, data: houses_visit_availability_model.filter(data => (data.status == "AVAILABLE" && !data.realtor_id)) };
        }
        return Timeslots_result;
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/DB_Error_Logs.json', DB_model_error, 'json')
        return { status: false, message: "Internal Server Error Please try Again" };
    }
}

const Book_Timeslot = async (req_data) => {
    let error_result = {};
    let update_json_result = {};
    try {
        let result = { status: false, message: "Internal Server Error Please try Again" };
        let occupied_realtor_array = [];
        let tenent_id = tenent_model.length > 0 ? tenent_model[tenent_model.length - 1].id + 1 : 1;
        tenent_model.push({ id: tenent_id, name: req_data.name, email: req_data.email, phone: req_data.phone });
        update_json_result = await update_json_file("./Models/tenent.json", tenent_model);
        if (update_json_result.status) {
            //getting perticualr row in Houses_visit_availability which is to be updated where status == "AVAILABLE"
            let visit_availability_item = houses_visit_availability_model.filter(data => (data.id == req_data.id && data.status == "AVAILABLE"))
            if (visit_availability_item.length > 0) {
                //Getting occupied realtors
                let occupied_realtor = houses_visit_availability_model.filter(data => (data.start_time == visit_availability_item.start_time && data.day_of_week == req_data.day_of_week))
                if (occupied_realtor.length >= realtor_model.length) result = { status: true, message: "No realtor available for current slot" }
                else {
                    occupied_realtor.forEach(data => occupied_realtor_array.push(data.id))
                    //getting available_realtors
                    let available_realtor = realtor_model.filter(data => !occupied_realtor_array.includes(data.id));
                    if (available_realtor.length > 0) {
                        houses_visit_availability_model[req_data.id - 1].tenent_id = tenent_id;
                        houses_visit_availability_model[req_data.id - 1].status = "BLOCKED";
                        //assiging relator to the time slot
                        houses_visit_availability_model[req_data.id - 1].realtor_id = available_realtor[0].id;

                        let update_json_result1 = await update_json_file("./Models/house_visit_availability.json", houses_visit_availability_model);
                        if (update_json_result1.status) {
                            result = { status: true, data: houses_visit_availability_model[req_data.id - 1], message: "Timesloted Alloted Successfuly" }
                        } else {
                            result = { status: true, message: "Sorry due to some issue timeslot cannot be alloted please try again" }
                        }
                    }
                }
            } else result = { status: true, message: "Requested slot is already occupied please try other available slots" };
        }
        return result;
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/Controller_Error_Logs.json', Controller_model_error, 'json')
        return { status: false, message: "Internal Server Error Please try Again" };
    }
}


module.exports = { Get_House_List, Get_Available_Timeslot, Book_Timeslot }