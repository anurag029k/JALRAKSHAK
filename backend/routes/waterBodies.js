const express = require('express');
const WaterBody = require('../models/WaterBody');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/waterbodies
// @desc    Get all water bodies
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { district, category, status } = req.query;
    const query = {};

    if (district) query.district = district;
    if (category) query.category = category;
    if (status) query.status = status;

    const waterBodies = await WaterBody.find(query);
    res.json({
      success: true,
      count: waterBodies.length,
      waterBodies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/waterbodies/nearby
// @desc    Get nearby water bodies
// @access  Private
router.get('/nearby', protect, async (req, res) => {
  try {
    const { lat, lng, maxDistance = 10000 } = req.query;

    const waterBodies = await WaterBody.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json({
      success: true,
      count: waterBodies.length,
      waterBodies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/waterbodies/:id
// @desc    Get single water body
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const waterBody = await WaterBody.findById(req.params.id);

    if (!waterBody) {
      return res.status(404).json({
        success: false,
        message: 'Water body not found'
      });
    }

    res.json({
      success: true,
      waterBody
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/waterbodies
// @desc    Create new water body
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const waterBody = await WaterBody.create(req.body);
    res.status(201).json({
      success: true,
      waterBody
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/waterbodies/:id
// @desc    Update water body
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const waterBody = await WaterBody.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!waterBody) {
      return res.status(404).json({
        success: false,
        message: 'Water body not found'
      });
    }

    res.json({
      success: true,
      waterBody
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/waterbodies/:id
// @desc    Delete water body
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const waterBody = await WaterBody.findByIdAndDelete(req.params.id);

    if (!waterBody) {
      return res.status(404).json({
        success: false,
        message: 'Water body not found'
      });
    }

    res.json({
      success: true,
      message: 'Water body deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
