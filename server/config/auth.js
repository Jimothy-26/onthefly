// Step 1: Setting Up Config Files
import GitHubStrategy from "passport-github2";
import { pool } from "./database.js";

// Create variable to contain info to config GitHub strategy 
const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback",
};

// Verify function to determine which user in the database is logging in; Accepts four arguments 
const verify = async (accessToken, refreshToken, profile, callback) => {
  const {
    // Extract user profile
    _json: { id, name, login, avatar_url },
  } = profile;

  // Store User Data
  const userData = {
    githubId: id,
    username: login,
    avatarUrl: avatar_url,
    accessToken,
  };

  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [userData.username],
    );
    // Store first row of results in user variable
    const user = results.rows[0];

    // Checks if a user is found 
    if (!user) {
      const results = await pool.query(
        `INSERT INTO users (githubid, username, avatarurl, accesstoken)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
        [userData.githubId, userData.username, userData.avatarUrl, accessToken],
      );
      const newUser = results.rows[0];
      return callback(null, newUser);
    }
    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

export const GitHub = new GitHubStrategy(options, verify);
