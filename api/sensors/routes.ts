import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getSensorReadings } from "./service";

const router = Router();

// Limit each client to 60 requests per minute per sensor endpoint.
// Added ahead of the public release so a single client can't overwhelm
// the sensor network with polling requests.
const sensorRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: "Too many requests — please slow down and try again shortly." },
});

// GET /api/sensors/:sensorId/readings
// Returns the latest water-quality readings for a given sensor.
// Used by business clients to pull live data into their own dashboards.
router.get("/:sensorId/readings", sensorRateLimit, async (req, res) => {
  const { sensorId } = req.params;

  try {
    const readings = await getSensorReadings(sensorId);
    res.json({ sensorId, readings });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch sensor readings" });
  }
});

export default router;
