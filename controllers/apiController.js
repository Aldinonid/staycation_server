const Item = require("../models/Item");
const Traveler = require("../models/Member");
const Treasure = require("../models/Activity");
const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Booking = require("../models/Booking");

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

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      //? API Item
      const item = await Item.findOne({ _id: id })
        .populate({ path: "featureId", select: "_id name qty imageUrl" })
        .populate({ path: "activityId", select: "_id name type imageUrl" })
        .populate({ path: "imageId", select: "_id imageUrl" });

      //? API for Testimonial
      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "/images/testimonial1.jpg",
        name: "Happy Family",
        rate: 4.25,
        content:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "UI Designer",
      };

      //? API for Bank
      const bank = await Bank.find();

      //? Display API JSON
      res.status(200).json({
        ...item._doc,
        bank,
        testimonial,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  bookingPage: async (req, res) => {
    //? Retrieve data from user fill in
    const {
      itemId,
      duration,
      bookingStartDate,
      bookingEndDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;

    //? Logic when user not upload image
    if (!req.file) {
      res.status(404).json({ message: "Image not found" });
    }

    //? Logic when user not fill in mandatory field
    if (
      itemId === undefined ||
      duration === undefined ||
      bookingStartDate === undefined ||
      bookingEndDate === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      email === undefined ||
      phoneNumber === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Please input your information" });
    }

    //? Retrieve item from what user choose
    const item = await Item.findOne({ _id: itemId });

    //? Logic if item isn't found
    if (!item) {
      res.status(404).json({ message: "Item not Found" });
    }

    //? Formula to generate the Total, Tax and Invoice Number
    item.sumBooking += 1;
    await item.save();
    let total = item.price * duration;
    let tax = total * 0.1;
    const invoice = Math.floor(1000000 + Math.random() * 9000000);

    //? Create user Name as Member
    const member = await Traveler.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    //? Grouping all field for Booking Create
    const newBooking = {
      invoice,
      bookingStartDate,
      bookingEndDate,
      total: (total += tax),
      itemId: {
        _id: item.id,
        title: item.title,
        price: item.price,
        duration: duration,
      },
      memberId: member.id,
      payments: {
        proofPayment: `images/${req.file.filename}`,
        bankFrom: bankFrom,
        accountHolder: accountHolder,
      },
    };

    //? Create booking
    const booking = await Booking.create(newBooking);
    res.status(201).json({ message: "Booking Success", booking });
  },
};
