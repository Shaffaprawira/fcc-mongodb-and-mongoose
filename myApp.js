require("dotenv").config();
const mongoose = require("mongoose");
const personSchema = require("./model/person");
const { response } = require("express");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person = personSchema;

arrayOfPeople = [
  {
    name: "Jane Fonda",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  },
  {
    name: "Honda Sensei",
    age: 70,
    favoriteFoods: ["eggs", "chicken"],
  },
  {
    name: "James",
    age: 84,
    favoriteFoods: ["fresh fruit", "cheese", "ham"],
  },
];

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Jane Fonda",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });
  person.save((err, data) => {
    if (err) {
      console.log("an error occured");
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log("an error occured");
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log("data not found");
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log("data not found");
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) {
      console.log("data not found");
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) {
      console.log("data not found");
      return done(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err, foodUpdate) => {
      if (err) {
        console.log("failed to add food");
        return done(err);
      }
      done(null, foodUpdate);
    });
    //done(null , data);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      if (err) {
        console.log("data not found");
        return done(err);
      }
      person.save((err, ageUpdate) => {
        if (err) {
          console.log("failed to update age");
          return done(err);
        }
        done(null, ageUpdate);
      });
      // done(null , data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, removed) => {
    if (err) {
      console.log("data not found");
      return done(err);
    }
    done(null, removed);
    // removedPerson = person.indexOf(personId);
    // if (removedPerson > -1) {
    //   person.splice(removedPerson, 1);
    // }
    // person.save((err, removed) => {
    //   if (err) {
    //     console.log("failed to remove person");
    //     return done(err);
    //   }
    //   done(null, removed);
    // });
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, removed) => {
    if (err) {
      console.log("data not found");
      return done(err);
    }
    console.log(`data with name = ${nameToRemove} has been removed`);
    done(null, removed);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }, (err, food) => {
    if (err) {
      console.log("data not found");
    }
    done(null, food);
  })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, food) => {
      if (err) {
        console.log("execution failed: ", err);
        return done(err);
      }
      done(null, food);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
