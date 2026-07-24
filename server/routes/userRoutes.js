const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * GET /api/users
 * Returns every team member, newest first.
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

/**
 * POST /api/users
 * Adds a new team member. Defaults to available.
 * Body: { name, role, isAvailable? }
 */
router.post("/", async (req, res) => {
  try {
    const { name, role, isAvailable } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: "name and role are both required" });
    }

    const user = await User.create({ name, role, isAvailable });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Failed to create user", error: err.message });
  }
});

/**
 * PATCH /api/users/:id
 * The endpoint the toggle actually calls.
 * Body: { isAvailable: boolean }
 * Kept intentionally narrow (booleans only) so a stray field from the
 * client can never silently overwrite name/role.
 */
router.patch("/:id", async (req, res) => {
  try {
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "isAvailable must be a boolean" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true, runValidators: true } // return the post-update document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Failed to update availability", error: err.message });
  }
});

/**
 * DELETE /api/users/:id
 * Removes a team member from the tracker.
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User removed", id: user._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

module.exports = router;
