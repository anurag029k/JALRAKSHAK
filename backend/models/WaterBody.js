const mongoose = require('mongoose');

const waterBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  district: {
    type: String,
    required: [true, 'Please provide a district'],
    trim: true
  },
  area: {
    type: Number,
    required: [true, 'Please provide area in square meters']
  },
  category: {
    type: String,
    enum: ['lake', 'pond', 'wetland', 'reservoir', 'river'],
    required: [true, 'Please provide a category']
  },
  status: {
    type: String,
    enum: ['healthy', 'moderate', 'critical'],
    default: 'moderate'
  },
  healthScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  lastSurveyDate: {
    type: Date
  },
  lastQualityCheck: {
    type: Date
  }
}, {
  timestamps: true
});

// Create geospatial index for location queries
waterBodySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('WaterBody', waterBodySchema);
