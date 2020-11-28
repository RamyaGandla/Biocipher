export const Constants = {
    USERCREDENTIALS: {
      1 : {'name' : 'Admin', 'email' : 'admin@gmail.com', 'password' : 'admin@123', 'roleId': 1},
      2 : {'name' : 'test1', 'email' : 'test1@gmail.com', 'password' : 'test1@123', 'roleId': 0},
    },
    EMPLOYEEDATA: { user: [
    {
      "id" : 0,
      "name": "Admin",
      "email" : "admin@gmail.com",
      'roleId': 1,
    },
    {
      "id":1,
      "name":"test1",
      "email" : "test1@gmail.com",
      'roleId': 0,
    },
    {
      "id" : 2,
      "name":"test2",
      "email" : "test2@gmail.com",
      'roleId': 0,
    },
    {
      "id":3,
      "name":"test3",
      "email" : "test3@gmail.com",
      'roleId': 0,
    },
    {
      "id":4,
      "name":"test4",
      "email" : "test4@gmail.com",
      'roleId': 0,
    },
  ]},
  Roles: {
    1: {
      "id": 0,
      "name": "User",
    },
    2: {
      "id": 1,
      "name": "Admin",
    },
  },
};
