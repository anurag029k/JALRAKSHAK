const express = require("express");
const router = express.Router();
const WaterBody = require("../models/WaterBody");

router.get("/", async (req, res) => {
  try {
    const waterBodies = await WaterBody.find();

    const heatmapData = waterBodies
      .filter(
        (wb) =>
          wb.location &&
          wb.location.coordinates &&
          wb.location.coordinates.length === 2
      )
      .map((wb) => ({
        lat: wb.location.coordinates[1],
        lng: wb.location.coordinates[0],
        intensity: 100 - wb.healthScore,
        name: wb.name,
      }));

    res.json(heatmapData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;