const mongoose = require('mongoose');

async function list() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jalrakshak';
  console.log('Connecting to URI:', uri);
  await mongoose.connect(uri);
  
  const admin = new mongoose.mongo.Admin(mongoose.connection.db);
  const dbs = await admin.listDatabases();
  console.log('Databases:', dbs.databases.map(d => `${d.name} (${d.sizeOnDisk} bytes)`));
  
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections in current DB:', collections.map(c => c.name));
  
  for (const col of collections) {
    const count = await mongoose.connection.db.collection(col.name).countDocuments();
    console.log(`- Collection ${col.name}: ${count} documents`);
  }
  
  await mongoose.disconnect();
}

list().catch(console.error);
