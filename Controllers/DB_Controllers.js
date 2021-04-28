const updateJsonFile = require('update-json-file')
const { createQuery } = require('../DB/Mysql_connect')
let { mysqloperations } = require('../DB/Mysql_operations')
let houses_model = require('../Models/houses.json')
let houses_visit_availability_model = require('../Models/house_visit_availability.json')

const Seed_Data = async () => {
    try {
        let params = {
            option: '',
            sql: ``,
            data: []
        }
        let result = {};
        houses_model.forEach(async data => {
            params.sql = `INSERT INTO houses(id, title, description, address, owner_id) VALUES (?,?,?,?,?)`;
            params.data = [data.id, data.title, data.description, data.address, data.owner_id];
            result = await mysqloperations(params)
        })
        houses_visit_availability_model.forEach(async (data) => {
            params.sql = `INSERT INTO visit_availability(id, property_id, tenent_id, realtor_id, start_time, day_of_week, duration, Status) VALUES (?,?,?,?,?,?,?,?)`;
            params.data = [data.id, data.property_id, data.tenent_id, data.realtor_id, data.start_time, data.day_of_week, data.duration, data.status];
            result = await mysqloperations(params);
        });
        return result;
    } catch (err) {
        console.log(err);
        return { status: false, message: "err at updating Json File" };
    }
}

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
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let house_list_result = {};
        let filter = req_data.filter ? req_data.filter : '';
        switch (filter) {
            case "id":
                params.sql = `select * from houses where id=?`;
                params.data = [req_data.id];
                break;
            case "title":
                params.sql = `select * from houses where title like '%${req_data.title}%'`;
                params.data = [req_data.title];
                break;
            default: params.sql = `select * from houses`;
        }
        house_list_result = await mysqloperations(params);
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
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Timeslots_result = {};
        let filter = req_data.filter ? req_data.filter : '';
        switch (filter) {
            case "id":
                if (req_data.id) {
                    params.sql = `select * from visit_availability where id=? and Available_status=1`;
                    params.data = [req_data.id];
                }
                else Timeslots_result = { status: false, message: "Id required please pass id" }
                break;
            case "property_id":
                if (req_data.property_id) {
                    params.sql = `select * from visit_availability where property_id=? and Available_status=1`;
                    params.data = [req_data.property_id];
                } else Timeslots_result = { status: false, message: "property_id required please pass property_id" }
                break;
            case "date":
                if (req_data.date) {
                    params.sql = `select * from visit_availability where date=? and Available_status=1`;
                    params.data = [req_data.date];
                } else Timeslots_result = { status: false, message: "date required please pass property_id" }
                break;
            default: params.sql = `select * from visit_availability where Available_status=1`;
        }
        Timeslots_result = await mysqloperations(params);
        return Timeslots_result;
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/DB_Error_Logs.json', DB_model_error, 'json')
        return { status: false, message: "Internal Server Error Please try Again" };
    }
}

const Book_Timeslot = async (req_data) => {
    let error_result = {};
    try {
        let params = {
            option: '',
            sql: ``,
            data: []
        }
        let result = { status: false, message: "Internal Server Error Please try Again" };
        //check timesot requested is available and get current timeslot data
        params = {
            option: 'fetchdata',
            sql: `select * from visit_availability where id=? and Available_status=1`,
            data: [req_data.id]
        }
        let current_timeslot = await mysqloperations(params);
        if (current_timeslot.status && current_timeslot.data.length > 0) {
            //fetch available realtor
            params = {
                option: 'fetchdata',
                sql: `select r.id from visit_availability v,realtor r where v.start_time=? and v.date= ? and v.realtor_id<>r.id`,
                data: [current_timeslot.data[0].start_time, current_timeslot.data[0].date, req_data.phone]
            }
            let available_realtor = await mysqloperations(params);
            if (available_realtor.status && available_realtor.data.length > 0) {
                //update visit_availability with available realtor
                console.log(available_realtor.data[0])
                params = {
                    option: '',
                    sql: `update visit_availability set realtor_id=? ,Available_status=0 where id=?`,
                    data: [available_realtor.data[0].id, current_timeslot.data[0].id]
                }
                let book_visit = await mysqloperations(params);
                if (book_visit.status) {
                    //Insert record for tenent
                    params = {
                        option: '',
                        sql: `INSERT INTO tenent(name, email, phone,visit_id) VALUES (?,?,?,?)`,
                        data: [req_data.name, req_data.email, req_data.phone, current_timeslot.data[0].id]
                    }
                    let tenent_insert = await mysqloperations(params);
                    if (tenent_insert.status) {
                        result = { status: true, message: `booking visit successfull with realtor_id = ${available_realtor.data[0].id}` };
                    } else {
                        result = { status: false, message: `Error at saving tenent details please try again` };
                    }
                } else {
                    result = { status: false, message: `Error at boooking time slot pleae try again` };
                }
            } else {
                result = { status: false, message: "No realtor available for current slot" };
            }
        } else {
            result = { status: false, message: "Requested slot is already occupied please try other available slots" };
        }
        return result;
    } catch (err) {
        console.log(err);
        error_result = await Log_Controllers.LogError('myId', err, './Logs/Controller_Error_Logs.json', 'Controller_model_error', 'json')
        return { status: false, message: "Internal Server Error Please try Again" };
    }
}


module.exports = { Seed_Data, Get_House_List, Get_Available_Timeslot, Book_Timeslot }