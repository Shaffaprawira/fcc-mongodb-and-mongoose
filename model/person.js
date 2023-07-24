const mongoose = require('mongoose');

// Define the personSchema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;