// ─────────────────────────────────────────────────────────────
// EDIT ME: this is the only file you need to touch to personalize
// the whole website. Everything below is plain text/strings.
// ─────────────────────────────────────────────────────────────

const birthdayData = {
  // Her name, used across the site (reveal, letter, final surprise)
  name: 'Azlifa Amalia',

  // Small caption under the big "HAPPY BIRTHDAY" reveal
  tagline: 'Happy Birthday, {name}!',

  // The letter inside the message bottle.
  // Use {name} anywhere you want her name inserted automatically.
  letter: {
    salutation: 'Hey {name},',
    paragraphs: [
      "I know this isn't exactly the kind of present you can put on a shelf.",
      'But I wanted to give you something you might actually remember.',
      'So instead of flowers, I brought you a beach.',
      'Instead of a cake, I brought you a sunset.',
      "And instead of a normal birthday text... well, you got this weird little website. 😭",
      'Anyway — I hope this new year brings you more reasons to smile, more places worth exploring, more sunsets worth chasing, and more good, ordinary days than you can count.',
      'Keep being you. It works well on you.',
    ],
    signoff: 'Happy Birthday, 21st',
  },

  // Random wishes shown when a star is clicked in Section 6.
  // Add or remove as many as you like — at least 8 is recommended.
  wishes: [
    'May you find more beautiful places.',
    'May your happiest days still be ahead of you.',
    'May you always have a reason to smile.',
    'May life surprise you in the best ways.',
    'May your dreams take you somewhere beautiful.',
    'May the small things keep bringing you joy.',
    'May you never run out of good playlists for long walks.',
    'May the people who love you say it more often.',
    'May this year be softer and kinder than the last.',
    'May you always find your way back to the sea.',
  ],

  // Crab's little remarks when clicked in Section 4 (picked at random)
  crabLines: [
    "HEY! Don't distract me 😭",
    "I'm working here!",
    'Excuse me, delivery in progress.',
    "Five more steps, I promise.",
    'This is a very serious job, okay.',
  ],

  // Final closing lines in Section 8
  closing: {
    title: 'Happy Birthday, {name}! 🎂',
    body: 'May your life always have beautiful sunsets, calm seas, and exciting adventures.',
    farewell: 'See you at the next sunset. 🌅',
  },

  // Easter egg payoff text (Section 7 hidden "psst...")
  easterEgg: {
    prompt: 'psst...',
    found: 'You found the secret beach.',
    reward: 'Okay, now you officially deserve extra cake. 🍰',
    clicksNeeded: 5,
  },
}

export default birthdayData
