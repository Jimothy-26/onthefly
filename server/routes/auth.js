// Step 3: Creating a route for authenticating with GitHub
import express from "express";
import passport from "passport";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const router = express.Router();

// Checks if user exisits; returns status 200 and user 
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, user: null });
  }
});


// Returns 401 and failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: true, message: "failure" });
});

// Invalidates the login session
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      res.clearCookie("connect.sid");

      res.json({ status: "logout", user: {} });
    });
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["read:user"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/destinations`,
  }),
);

export default router;
