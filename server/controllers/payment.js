const axios = require('axios');

module.exports = {
  Add: async (req, res) => {
    try {
      // Validate input
      if (!req.body.amount || isNaN(req.body.amount)) {
        return res.status(400).json({ error: "Invalid amount" });
      }
  
      const payload = {
        app_token: process.env.FLOUCI_APP_TOKEN, // Store in .env!
        app_secret: process.env.FLOUCI_SECRET,
        amount: req.body.amount,
        accept_card: "true",
        session_timeout_secs: 2200,
        success_link: "http://localhost:3001/success",
        fail_link: "http://localhost:3001/fail",
        developer_tracking_id: "735e9bdb-8e06-4396-95f1-32dd31069e83",
      };
  
      const result = await axios.post(
        "https://developers.flouci.com/api/generate_payment",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      res.status(200).json(result.data);
    } catch (err) {
      console.error("Flouci API error:", err.response?.data || err.message);
      res.status(500).json({
        error: "Failed to create payment",
        details: err.response?.data || null,
      });
    }
  },

  verify: async (req, res) => {
    try {
      const payment_id = req.params.id;
      
      if (!payment_id) {
        return res.status(400).json({ error: "Payment ID is required" });
      }

      const result = await axios.get(
        `https://developers.flouci.com/api/verify_payment/${payment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            apppublic: "3072bc87-6e35-4250-b54e-0e2ebf0f3f82", // Move to .env
            appsecret: process.env.FLOUCI_SECRET,
          },
        }
      );

      res.status(200).json(result.data);
    } catch (err) {
      console.error("Payment verification error:", err.message);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  },
};