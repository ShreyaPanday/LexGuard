require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(express.json()); // To parse JSON request body
app.use(cors()); // To allow requests from React Native frontend

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "lexguard",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Twilio Credentials (From `.env`)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_WHATSAPP_NUMBER = "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER;

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", userSchema, "user");

// Define Emergency Contact Schema
const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // References User
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const Contact = mongoose.model(
  "contactInformation",
  contactSchema,
  "contactInformation"
);

// ✅ POST Route to Send WhatsApp Alert
app.post("/sendAlert", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate Input
    if (!email) {
      return res.status(400).json({ message: "User email is required!" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Get Emergency Contacts for the User
    const contacts = await Contact.find({ userId: user._id });

    if (!contacts.length) {
      return res.status(404).json({ message: "No emergency contacts found!" });
    }

    // WhatsApp Message
    const message = `🚨 ALERT! 🚨\n\n${user.name} is in danger. Please check on them immediately.\n\n- LexGuard Security`;

    // Send WhatsApp Message to Each Contact
    for (let contact of contacts) {
      const toWhatsAppNumber = "whatsapp:" + +12148763829; // WhatsApp requires the "whatsapp:" prefix

      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: toWhatsAppNumber,
        body: message,
      });
    }

    res.status(200).json({ message: "WhatsApp alerts sent successfully!" });
  } catch (error) {
    console.error("Error sending WhatsApp alert:", error);
    res.status(500).json({ message: "Failed to send alerts" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
