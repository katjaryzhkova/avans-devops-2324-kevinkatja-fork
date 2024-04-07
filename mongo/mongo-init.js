db = db.getSiblingDB(process.env.DB_NAME || 'users');

db.createCollection('users');

db.users.insertMany([
  {
    name: 'Test User',
    email: "test@test.com"
  }  
]);