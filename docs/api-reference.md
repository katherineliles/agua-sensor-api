# Sensor Readings API

## GET /api/sensors/:sensorId/readings

Returns the latest water-quality readings for a given sensor.

**Response**
```json
{
  "sensorId": "string",
  "readings": [
    { "metric": "string", "value": "number", "timestamp": "string" }
  ]
}
```

Rate limited to 60 requests per minute per sensor endpoint.
