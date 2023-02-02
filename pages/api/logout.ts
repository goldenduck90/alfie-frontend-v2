import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async function logoutRoute(req, res) {
  req.session.destroy();
  return res.json({ message: "Logged out" });
});
