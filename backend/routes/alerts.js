const express = require('express');
const Alert = require('../models/Alert');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/alerts
// @desc    Get all alerts
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { waterBodyId, severity, resolved } = req.query;
    const query = {};

    if (waterBodyId) query.waterBodyId = waterBodyId;
    if (severity) query.severity = severity;
    if (resolved !== undefined) query.resolved = resolved === 'true';

    const alerts = await Alert.find(query)
      .populate('waterBodyId', 'name district location')
      .sort({ timestamp: -1 });

    res.json({
      success: true,
      count: alerts.length,
      alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/alerts/unresolved
// @desc    Get unresolved alerts
// @access  Private
router.get('/unresolved', protect, async (req, res) => {
  try {
    const alerts = await Alert.find({ resolved: false })
      .populate('waterBodyId', 'name district')
      .sort({ timestamp: -1 });

    res.json({
      success: true,
      count: alerts.length,
      alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/alerts/:id
// @desc    Get single alert
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id)
      .populate('waterBodyId')
      .populate('resolvedBy', 'name')
      .populate('acknowledgedBy', 'name');

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    res.json({
      success: true,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/alerts/:id/acknowledge
// @desc    Acknowledge alert
// @access  Private
router.put('/:id/acknowledge', protect, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { acknowledgedBy: req.user._id } },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    res.json({
      success: true,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/alerts/:id/resolve
// @desc    Resolve alert
// @access  Private/Official
router.put('/:id/resolve', protect, authorize('admin', 'official'), async (req, res) => {
  try {
    const { resolutionNotes } = req.body;

    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        resolved: true,
        resolvedBy: req.user._id,
        resolvedAt: new Date(),
        resolutionNotes
      },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }

    res.json({
      success: true,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
