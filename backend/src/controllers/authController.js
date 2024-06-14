const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // delete user sensitive information from the request
    delete req.body.password;
    delete req.user.password;

    // user credentials have been verified by previous middleware (user is authenticated)_
    // create JWT info (token with expiration time)
    const payload = { sub: req.user.id_user, role: req.user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    if (!token) throw new Error("No authentication token returned");

    // send back authentication token to the client in a cookie, as well as user info to be stored in the context
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .status(200)
      .json(req.user);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("oops...an error occured when generating authentication token");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "user logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).send("oops...an error occured when loggin out the user");
  }
};

module.exports = { login, logout };
