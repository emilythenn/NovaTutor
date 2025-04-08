const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // Add CORS support
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Proxy endpoint
app.post("/proxy", async (req, res) => {
  const webAppUrl = "https://script.google.com/macros/s/AKfycbyZ0NPjoOq1aGrgpNNvQSdw37igjerMQob1zcSiIETEiEsPlumUDupJZruMCfCuGJE/exec";

  try {
    // Forward the request to the Google Apps Script Web App
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    // Parse the response from the Web App
    const data = await response.json();
    res.json(data); // Send the response back to the frontend
  } catch (error) {
    console.error("Error communicating with Google Apps Script:", error);
    res.status(500).send("Error communicating with the Web App");
  }
});

// Start the server
const PORT = 5001; // Ensure this matches your frontend configuration
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));