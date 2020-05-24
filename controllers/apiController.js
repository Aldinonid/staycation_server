const Item = require("../models/Item");
const Traveler = require("../models/Member");
const Treasure = require("../models/Activity");
const Category = require("../models/Category");
const Bank = require("../models/Bank");

module.exports = {
  landingPage: async (req, res) => {
    try {
      //? API for Most Picked
      const mostPicked = await Item.find()
        .select("_id title price city country imageId unit")
        .limit(5)
        .populate({ path: "imageId", select: "_id imageUrl" });

      //? API for Hero
      const traveler = await Traveler.find();
      const treasure = await Treasure.find();
      const city = await Item.find();

      //? API for Categories
      const category = await Category.find().populate({
        path: "itemId",
        select: "_id title country city sumBooking isPopular",
        perDocumentLimit: 4,
        options: { sort: { sumBooking: -1 } },
        populate: {
          path: "imageId",
          select: "_id imageUrl",
          perDocumentLimit: 1,
        },
      });

      //? Logic for isPopular
      for (let i = 0; i < category.length; i++) {
        for (let x = 0; x < category[i].itemId.length; x++) {
          const item = await Item.findOne({ _id: category[i].itemId[x].id });
          item.isPopular = false;
          await item.save();
          if (category[i].itemId[0] === category[i].itemId[x]) {
            item.isPopular = true;
            await item.save();
          }
        }
      }

      //? API for Testimonial
      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "/images/testimonial2.jpg",
        name: "Happy Family",
        rate: 4.55,
        content:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };

      //? Display API JSON
      res.status(200).json({
        Hero: {
          travelers: traveler.length,
          treasures: treasure.length,
          cities: city.length,
        },
        mostPicked,
        category,
        testimonial,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
