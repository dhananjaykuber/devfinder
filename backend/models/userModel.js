const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        github_link: {
          type: String,
        },
        live_link: {
          type: String,
        },
        tags: {
          type: Array,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userSchema);

/*
name
gender
accountType
email
contactNumber
bio
skills : []
linkedin
github
twitter
portfolio
password
projects : [ {} ]
*/
