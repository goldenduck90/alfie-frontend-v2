import { withSessionRoute } from "lib/withSession";

export default withSessionRoute(async function sessionRoute(req, res) {
  return res.json({ user: (req.session as any).user });
});
