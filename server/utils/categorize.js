// categorizationUtils.js
const natural = require('natural');

// Example of keyword-based categorization
const categorizeExpense = (description) => {
    const categories = {
        groceries: ['groceries', 'supermarket', 'food', 'grocery'],
        utilities: ['electricity', 'water', 'internet', 'gas'],
        entertainment: ['movie', 'streaming', 'netflix', 'games', 'concert'],
        transport: ['uber', 'taxi', 'bus', 'train', 'gas', 'fuel'],
        healthcare: ['doctor', 'medicine', 'pharmacy', 'hospital'],
    };

    description = description.toLowerCase();

    // Check for keywords and categorize
    for (let category in categories) {
        if (categories[category].some(keyword => description.includes(keyword))) {
            return category; // Return the matched category
        }
    }

    return 'others'; // Default category if no match
};

module.exports = { categorizeExpense };
