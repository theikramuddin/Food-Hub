const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/dialogflow-webhook", async (req, res) => {
    const intent = req.body.queryResult.intent.displayName;

    let responseText = "Sorry, I didn't understand that.";

    if (intent === "Order Pizza") {
        const { pizzaType, quantity } = req.body.queryResult.parameters;
        
        // Example: Store order details in session or database
        responseText = `You ordered ${quantity} ${pizzaType} pizza(s). Would you like to confirm your order?`;
    }

    res.json({
        fulfillmentText: responseText
    });
});

module.exports = router;
