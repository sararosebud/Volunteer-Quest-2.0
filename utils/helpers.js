module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random background image URL
    if (randomNum > 0.7) {
      return 'https://images.pexels.com/photos/1792149/pexels-photo-1792149.jpeg';
    } else if (randomNum > 0.4) {
      return 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    } else {
      return 'https://images.pexels.com/photos/1792149/pexels-photo-1792149.jpeg';
    }
  },

};
