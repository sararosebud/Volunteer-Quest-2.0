const User = require('./User');
const Event = require('./Event')
const Comment = require('./Comment')
const Subscription = require('./Subscription')

// user/event associations
User.hasMany(Event, { // one organizer can create many events
  foreignKey: 'creator_id',
  onDelete: 'CASCADE',
}); 
Event.belongsTo(User, { // each event belongs to a single creator/organizer/coordinator
  foreignKey: 'creator_id',
});

// user/event associations when subscribing
User.belongsToMany(Event, { // since we want record of users subscribed to events we need a subscription table, which will create a new row
  through: Subscription, // everytime the user clicks subscribe, taking in the specific event_id and specific user_id for the sub row. 
  foreignKey: 'user_id', // this way we can query all events for a user by searching where all rows where their user_id exists, all the users for a
  onDelete: 'CASCADE', // event when we query all by event_id, and delete event subscriptions for a user where both event_id and user_id match.
});
Event.belongsToMany(User, {
  through: Subscription,
  foreignKey: 'event_id',
  onDelete: 'CASCADE'
});

// user/comment associations 
User.hasMany(Comment, { // user creates many comments
  foreignKey: 'commenter_id',
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, { // each comment belongs to a single user
  foreignKey: 'commenter_id',
});

module.exports = { User, Event , Comment, Subscription };

// in this file we import all the models and define the associations between them, then export it back to the app
