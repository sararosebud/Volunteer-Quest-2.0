const sequelize = require('../config/connection');
const { User, Event, Comment, Subscription } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const commentData = require('./')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of eventData) {
    const organizers = users.filter(user => user.isOrganizer);
    const organizer = organizers[Math.floor(Math.random() * organizers.length)];
    await Event.create({
      ...event,
      creator_id: organizer.id,
      date_created: new Date(),
      event_date: new Date(event.event_date),
    });
  } 

  


  process.exit(0);
};

seedDatabase();
