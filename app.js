const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect('<your_mongo_uri>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


const userDataSchema = new mongoose.Schema({
  gender: String,
  goal: String,
  age: Number,
  height: Number,
  currentWeight: Number,
  targetWeight: Number,
  workoutPreference: String,
  medicalCondition: String,
  calorieIntake: Object, 
});

const UserData = mongoose.model('UserData', userDataSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/userData', (req, res) => {
  res.render('userData');
});

app.get('/calorieTracker', (req, res) => {
  res.render('calorieTracker');
});


app.post('/submitUserData', async (req, res) => {
  try {
    const {
      gender,
      goal,
      age,
      height,
      currentWeight,
      targetWeight,
      workoutPreference,
      medicalCondition,
      calorieIntake,
    } = req.body;

   
    const userData = new UserData({
      gender,
      goal,
      age,
      height,
      currentWeight,
      targetWeight,
      workoutPreference,
      medicalCondition,
      calorieIntake, 
    });

    
    await userData.save();
    console.log('User data saved:', userData);

   
    res.redirect('/calorieTracker');
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
