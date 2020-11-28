import User from '../../../models/user';

export default async function (req, res) {
  const users = await User.find({});
  res.setHeader('Content-Type', 'application/json');
  res.status(200).end(JSON.stringify({ users }));
}
