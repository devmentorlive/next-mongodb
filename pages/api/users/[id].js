import User from '../../../models/user';

export default async function UsersShow(req, res) {
  const user = await User.findOne({ _id: req.query.id });
  const matches = await user.getMatches();

  const { status, json } = !user
    ? { status: 400, json: { errors: { user: 'not found' } } }
    : {
        status: 200,
        json: {
          user,
          matches,
        },
      };

  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(json);
}
