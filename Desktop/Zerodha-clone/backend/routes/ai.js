const router = require("express").Router();

router.post("/", (req, res) => {
  const { question } = req.body;

  // Simple rule-based AI
  let response = {
    risk_level: "Medium",
    summary: "Moderate volatility detected.",
    recommendation: "Hold"
  };

  if (question.toLowerCase().includes("risky")) {
    response = {
      risk_level: "High",
      summary: "High volatility and concentration risk.",
      recommendation: "Avoid"
    };
  }

  res.json(response);
});

module.exports = router;