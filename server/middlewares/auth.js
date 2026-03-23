import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Token not found" });
    }

    const token_decode = jwt.decode(token);

    if (!token_decode) {
      return res.json({ success: false, message: "Invalid token" });
    }

    req.body = req.body || {};
    req.body.clerkid = token_decode.sub;

    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;