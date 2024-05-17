const jwt = require("jsonwebtoken");

// decode a user's token and get its payload.

const verifyJWT = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader);
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6ImRvcmplIiwicm9sZXMiOlsyMDAxLDE5ODQsNTE1MF19LCJpYXQiOjE2NjI4NjUxNjUsImV4cCI6MTY2Mjg2NTE3NX0.TOYxBk58lUN_wDZtFW8ShP-Z3tF6P92OVpPmNCg1y20
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6ImRvcmplIiwicm9sZXMiOlsyMDAxLDE5ODQsNTE1MF19LCJpYXQiOjE2NjI4NjUxNjUsImV4cCI6MTY2Mjg2NTE3NX0.TOYxBk58lUN_wDZtFW8ShP-Z3tF6P92OVpPmNCg1y20
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.json({ message: err.message });
      return res.sendStatus(403); //invalid token
    }
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
