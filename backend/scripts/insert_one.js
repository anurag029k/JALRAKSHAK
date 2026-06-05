const mongoose = require('mongoose');
const WaterBody = require('../models/WaterBody');

async function test() {
  await mongoose.connect('mongodb://localhost:27017/jalrakshak');
  console.log('Connected.');
  await WaterBody.deleteMany();
  
  const wb = await WaterBody.create({
    name: 'Test Pond',
    location: { type: 'Point', coordinates: [77.209, 28.6139] },
    district: 'Central Delhi',
    area: 1000,
    category: 'pond',
    status: 'healthy',
    healthScore: 90
  });
  console.log('Inserted: ', wb);
  
  const count = await WaterBody.countDocuments();
  console.log('Count:', count);
  
  await mongoose.disconnect();
}

test().catch(console.error);
