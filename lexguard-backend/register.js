require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { askGemini } = require("./gemini.js");

const app = express();
app.use(express.json()); // To parse JSON request body
app.use(cors()); // To allow requests from React Native frontend

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "lexguard",
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("user", userSchema, "user"); // Explicitly defining collection name "user"

// Define Emergency Contact Schema
const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // References User
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }
});

const Contact = mongoose.model("contactInformation", contactSchema, "contactInformation");

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    request: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
  
const History = mongoose.model("history", historySchema, "history");

// ✅ POST Route for User Registration
app.post("/register", async (req, res) => {
  try {
    const { name, age, phone, gender, email, password, confirmPassword } = req.body;

    // Validate Inputs
    if (!name || !age || !phone || !gender || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value!" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User in "lexguard.user"
    const newUser = new User({ name, age, phone, gender, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST Route for User Login (Returns `userId`)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    res.status(200).json({ message: "Login successful!", userId: user._id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST Route for Adding Emergency Contact (Auto-fetches `userId` from Email)
app.post("/addEmergencyContact", async (req, res) => {
  try {
    const { email, name, phone, contactEmail } = req.body;

    // Validate Inputs
    if (!email || !name || !phone || !contactEmail) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    console.log(email);
    // Find user by email
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Save Contact Information
    const newContact = new Contact({ userId: user._id, name, phone, email: contactEmail });
    await newContact.save();

    res.status(201).json({ message: "Emergency contact added successfully!" });
  } catch (error) {
    console.error("Error adding emergency contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/getLegalAdvice", async (req, res) => {
    try {
      const { email, userQuery } = req.body;
  
      // Validate Inputs
      if (!email || !userQuery) {
        return res.status(400).json({ message: "Email and userQuery are required!" });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      // Generate Legal Advice using Gemini AI
      const generatedText = await askGemini(userQuery);
  
      // Save the request and response in MongoDB (History)
      const newHistory = new History({
        userId: user._id,
        request: userQuery,
        response: generatedText
      });
  
      await newHistory.save();
  
      // Return AI-generated legal advice
      res.status(200).json({ message: "Legal advice retrieved successfully!", legalAdvice: generatedText });
    } catch (error) {
      console.error("Error generating legal advice:", error);
      res.status(500).json({ message: "Server error" });
    }
  });



// ✅ GET Route to Fetch Emergency Contacts for a User
app.get("/getEmergencyContacts", async (req, res) => {
  try {
    const email = req.query.email?.trim();

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Find Emergency Contacts
    const contacts = await Contact.find({ userId: user._id });
    

    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching emergency contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET Route to Fetch Legal Advice History for a User
app.get("/getLegalAdviceHistory", async (req, res) => {
    try {
      const email = req.query.email?.trim();
      // Validate input
      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      // Fetch history records for the user
      const historyRecords = await History.find({ userId: user._id }).sort({ timestamp: -1 });
  
      res.status(200).json({ history: historyRecords });
    } catch (error) {
      console.error("Error fetching legal advice history:", error);
      res.status(500).json({ message: "Server error" });
    }
});
  

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
