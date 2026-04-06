const router = require("express").Router();

function normalize(value, max) {
  return (value / max) * 10;
}

router.get("/", (req, res) => {
  // Mock inputs
  const data = {
    volatility: 6,
    concentration: 8,
    drawdown: 5,
    sentiment: 4,
    trend: 6,
    liquidity: 7
  };

  const score =
    0.30 * data.volatility +
    0.20 * data.concentration +
    0.15 * data.drawdown +
    0.10 * data.sentiment +
    0.10 * data.trend +
    0.15 * data.liquidity;

  let level = "Low";
  if (score > 7) level = "High";
  else if (score > 4) level = "Medium";

  res.json({
    totalScore: score.toFixed(2),
    level,
    breakdown: data
  });
});

module.exports = router;