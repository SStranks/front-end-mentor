const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: {
    type: 'Number',
  },
  apply: {
    type: 'String',
  },
  company: {
    type: 'String',
  },
  contract: {
    type: 'String',
  },
  description: {
    type: 'String',
  },
  location: {
    type: 'String',
  },
  logo: {
    type: 'String',
  },
  logoBackground: {
    type: 'String',
  },
  position: {
    type: 'String',
  },
  postedAt: {
    type: 'String',
  },
  requirements: {
    content: {
      type: 'String',
    },
    items: {
      type: ['String'],
    },
  },
  role: {
    content: {
      type: 'String',
    },
    items: {
      type: ['String'],
    },
  },
  website: {
    type: 'String',
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
