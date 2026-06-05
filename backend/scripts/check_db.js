require('dotenv').config();
const mongoose = require('mongoose');
const WaterBody = require('../models/WaterBody');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jalrakshak');
  const total = await WaterBody.countDocuments();
  console.log('Total Water Bodies in DB:', total);
  
  const samples = await WaterBody.find().limit(20);
  console.log('Samples (Name, HealthScore, Status):');
  samples.forEach(s => {
    console.log(`- ${s.name}: HealthScore = ${s.healthScore}, Status = ${s.status}`);
  });

  const mismatched = await WaterBody.find({
    $or: [
      { healthScore: { $gte: 80 }, status: { $ne: 'healthy' } },
      { healthScore: { $lt: 50 }, status: { $ne: 'critical' } },
      { healthScore: { $gte: 50, $lt: 80 }, status: { $ne: 'moderate' } }
    ]
  });
  console.log('Number of mismatched status/healthScore documents:', mismatched.length);
  if (mismatched.length > 0) {
    console.log('Mismatched samples:');
    mismatched.slice(0, 10).forEach(s => {
      console.log(`- ${s.name}: HealthScore = ${s.healthScore}, Status = ${s.status}`);
    });
  }

  await mongoose.disconnect();
}

check().catch(console.error);
