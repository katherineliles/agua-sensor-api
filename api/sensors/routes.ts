import { Router } from "express";
import { getSensorReadings } from "./service";

const router = Router();

// GET /api/sensors/:sensorId/readings
// Returns the latest water-quality readings for a given sensor.
// Used by business clients to pull live data into their own dashboards.
router.get("/:sensorId/readings", async (req, res) => {
  const { sensorId } = req.params;

  try {
    const readings = await getSensorReadings(sensorId);
    res.json({ sensorId, readings });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch sensor readings" });
  }
});

export default router;
