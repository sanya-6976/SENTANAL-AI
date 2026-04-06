const router = require("express").Router();

router.get("/", (req, res) => {
  const portfolio = [
    { name: "RELIANCE", value: 50000 },
    { name: "TCS", value: 30000 },
    { name: "INFY", value: 20000 }
  ];

  const total = portfolio.reduce((a, b) => a + b.value, 0);

  const allocation = portfolio.map(stock => ({
    ...stock,
    percent: ((stock.value / total) * 100).toFixed(1),
    warning: (stock.value / total) > 0.5
  }));

  res.json({ total, allocation });
});

module.exports = router;