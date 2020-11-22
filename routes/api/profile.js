const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const { restart } = require('nodemon');
const fetch = require('node-fetch');

// @ROUTE   GET API/PROFILE/ME
// @DESC    Get Current Users Profile
// @ACCESS  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: "There's no profile for this user" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// @ROUTE   GET API/PROFILE/
// @DESC    Create or Update user Profile
// @ACCESS  Private

router.post('/', [auth, [check('status', 'Status is Required').not().isEmpty(), check('skills', 'Skills is Required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { company, website, location, bio, status, githubusername, skills, youtube, twitter, facebook, linkedin, instagram } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;

  if (skills) {
    const skillfield = skills.split(',').map((skill) => skill.trim());
    profileFields.skills = skillfield;
  }

  profileFields.social = {};

  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = youtube;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
      return res.status(200).json({ profile });
    }

    profile = new Profile(profileFields);

    await profile.save();
    res.status(200).json({ profile });
  } catch (err) {
    console.log(profileFields.user);
    console.error(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// @ROUTE   GET API/PROFILE/
// @DESC    Get All Profiles
// @ACCESS  Public

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.find().populate('user', ['name', 'avatar']);
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Internal Server Error ');
  }
});

module.exports = router;

// @ROUTE   GET API/PROFILE/USER/:user_id
// @DESC    Get All Profiles
// @ACCESS  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile Not Found' });
    }
    console.error(error.message);
    res.status(500).json('Internal Server Error ');
  }
});

// @ROUTE   GET API/PROFILE/
// @DESC    Delete Profile, user & posts
// @ACCESS  Private

router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    await Post.deleteMany({ user: req.user.id });

    // remove user

    res.status(200).json('User Deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Internal Server Error ');
  }
});

// @ROUTE   Put API/PROFILE/experience
// @DESC    put Experience
// @ACCESS  Private

router.put(
  '/experience',
  [auth, [check('title', 'Title is Required').not().isEmpty(), check('company', 'company is Required').not().isEmpty(), check('from', 'From is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } = req.body;

    const experience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(experience);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
);

// @ROUTE   delete API/PROFILE/experience
// @DESC    delete Experience
// @ACCESS  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience.map((exp) => exp.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// @ROUTE   Put API/PROFILE/
// @DESC    Post education
// @ACCESS  Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is Required').not().isEmpty(),
      check('degree', 'Degree is Required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is Required').not().isEmpty(),
      check('from', 'From is Required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const education = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(education);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
);

// @ROUTE   Delete API/PROFILE/education
// @DESC    Delete Education
// @ACCESS  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education.map((edu) => edu.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// GITHUB

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=10&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github Profile Found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
