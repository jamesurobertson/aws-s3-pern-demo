const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();

const validateSignup = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        User.findOne({ where: { email: req.body.email } })
          .then((res) => {
            console.log("res.....", res);
            if (res) {
              reject("Email already taken");
            } else {
              resolve();
            }
          })
          .catch((err) => {
            rej("Database error: ", err.message);
          });
      });
    }),
  check("username")
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters.")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        User.findOne({ where: { username: req.body.username } })
          .then((res) => {
            if (res) {
              reject("Username already taken");
            } else {
              resolve();
            }
          })
          .catch((err) => {
            rej("Database error: ", err.message);
          });
      });
    }),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({
      username,
      email,
      password,
      profileImageUrl,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// for multiple files
// router.post(
//   "/",
//   multipleMulterUpload("images"),
//   asyncHandler(async (req, res) => {
//     const images = await multiplePublicFileUpload(req.files);
//     // Do something with the images
//     // images is an array where each element is the url to your bucket.
//   })
// );

router.put(
  "/:id",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    await User.update({ profileImageUrl }, { where: { id } });

    res.json({ profileImageUrl });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  })
);

module.exports = router;
