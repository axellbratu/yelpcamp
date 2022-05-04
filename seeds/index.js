const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");
mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch((e) => {
    console.log(e);
  });

const db = mongoose.connection;

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "625941d7b087433448fb8b46",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, architecto non perferendis animi est officiis suscipit! Molestias",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close;
});
