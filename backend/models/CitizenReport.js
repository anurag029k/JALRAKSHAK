const mongoose = require('mongoose');

const citizenReportSchema = new mongoose.Schema({
  waterBodyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WaterBody'
  },
  reporterName: {
    type: String,
    required: true,
    trim: true
  },
  reporterEmail: {
    type: String,
    required: true,
    trim: true
  },
  reporterPhone: {
    type: String,
    required: true,
    trim: true
  },
  issueType: {
    type: String,
    enum: ['pollution', 'encroachment', 'waste_dumping', 'sewage', 'drying', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String
  }],
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'resolved'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  verificationNotes: {
    type: String
  },
  aiAnalysisResults: {
    detectedIssues: [{
      type: String,
      confidence: Number
    }]
  }
}, {
  timestamps: true
});

citizenReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('CitizenReport', citizenReportSchema);
