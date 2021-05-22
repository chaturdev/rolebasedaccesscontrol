# Role Base Access Control Sample Project based on express and jwt token

  clone this project
## How to run
  Set PORT env variable else it will run on 3001 port 
 ## npm start will start the project
## API
  1:- POST http://localhost:3001/api/auth/signin 
      
      {
    "username":"adminUser",
    "password":"admin@123"
    }
  this is precreated user in db with admin role 
      
  2:- POST http://localhost:3001/api/user/create  -> only available for admin role
  
    {
    "username":"example",
    "password":"example",
    "email":"example",
    "roles":["user","admin"]
    }
if roles not provided user role will be assigned 
  
  3:- http://localhost:3001/api/auth/signup  -> this will create user with user role 
  
       {
    "username":"example",
    "password":"example",
    "email":"example"
    } 
User will be created with user role only 
