"# Kutuki_Assignment"

Data Storage
1)Mysql Database: (Primary)
To use Database as storage open .env file and update Datastorage=DB
2)JSON files are used for Data Storage : (optional/Secondary)
To use Json FIle as storage open .env file and update Datastorage=json

DataBase Configuration :

1. Install Xampp server or any other mysql Server.
2. create Database with name: kutuki.
3. Navigate to project Root folder find DB_file in Kutuki_Assignment/DB_File/kutuki.sql and export to recently created database.
4. Update DB_credentials in .env file.
5. NODE_ENV=development
   Datastorage=DB         // To use DataBase as Data Store   

   PORT=3000                  // Port @ which server is running
   MYSQL_HOST=*********       // Host name
   MYSQL_DBNAME=kutuki        // DB name
   MYSQL_USERNAME= *******    // Username
   MYSQL_PASSWORD= *******    // Password
   


DepenDencies used:

1. body-parser: Parsing Request body ,
2. compression: gzip compression all response to optmize performance,
3. cors: To configure cross orign resource sharing,
4. dotenv: protect important credentials from direct manipulation and protect from xss,
5. helmet: protect APi from responding to the unknown and unauthorized headers,
6. update-json-file: To update json file,
7. validatorjs: To perform customized validation of input request

What has been completed

1. Implemented Api to Get List_houses
2. Implemented Api to Get_Time_Slots
3. Implemented Api to capture tenent user details and Book_visit for available time slot and assign realtor to that perticular Time Slot

4. Implemented centalized error logging to track error at production.
5. Implemented DataModules using Json file to serve similiar to Data base
6. Implemented basic validation customized validations to validate request
7. Implemented contollers to handle Business logic
8. Implemented Routes to handle different Api routs

What is not completed

1. An email notification should be sent to the prospect & realtor notifying them about the
   visitation.(need more clarification on this )

Deployment steps

1. clone git Repository
   git clone https://github.com/naveengangadharappa/Kutuki_Assignment.git

2. Navigate to project root Directory and execute
   npm install

3. Node server will by up and running by at localhost port 3000
   Api End Point: http://localhost:3000/Assignment

Known bugs

1. Cors (Cross origin resource sharing) : include npm cors and configure / allow resource sharing for different origin
2. In include body parser bodyparser.json() to parse Json Request and bodyparser.urlencoded({extended: true}); to form-urlencoded data
