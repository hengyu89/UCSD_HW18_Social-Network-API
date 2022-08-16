const connection = require('../config/connection');
const { Reaction, Thought, User } = require('../models');

const { getRandomIndex, getRandomWord, getRandomThought, getRandomName } = require('./data');

console.time('seeding');

connection.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  // const thoughts = [];
  const users = [];

  const makeUser = (thought) => {
    const username = getRandomName();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];
    const email = `${first}${last}@gmail.com`;

    users.push({
      username,
      email,
      thoughts: [thoughts[getRandomIndex(thoughts)]._id],
      friends: [users[gerRandomIndex(users)]._id],
    });
  };

  const makeThought = () => {
    const thoughtText = getRandomThought();
    const username = getRandomName();
    const reactions = getRandomReaction();

    thoughts.push({
      thoughtText,
      username,
      reactions,
    });
  };
  
  const thoughts = [{
    thoughtText: 'aloha',
    username: 'bloha',
    reactions: {
      reactionBody: 'cloha',
      username: 'dloha',
    }
  }]
  
  console.log(thoughts);
  await Thought.collection.insertMany(thoughts);
  console.log(users);
  await User.collection.insertMany(users);

  console.table(thoughts);
  console.table(users);
  console.timeEnd('seeding');
  process.exit(0);
});
