const mongoose = require('mongoose');


const dbURI = 'mongodb://localhost:27017/fitnessDB'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const userDataSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  goal: {
    type: String,
    enum: ['muscle gain', 'weight loss'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  currentWeight: {
    type: Number,
    required: true
  },
  targetWeight: {
    type: Number,
    required: true
  },
  workoutPreference: {
    type: String,
    enum: ['gym', 'at home'],
    required: true
  },
  medicalConditions: {
    type: [String], 
    enum: ['diabetes', 'high blood pressure', 'breathing problem', 'past surgery', 'other'],
    default: []
  },
  recommendedPlan: {
    type: String,
    required: false 
  }
});


const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
