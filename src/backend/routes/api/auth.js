import { Router as router } from 'express';
import { adminOnly, authNeeded, createJWT } from '../../lib/auth';

const routes = router();

routes.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400);
  }

  const { username, password } = req.body;

  const user = {
    username,
    admin: true,
  };

  if (password && password.length > 1) {
    return res.send({
      status: 'SUCCESS',
      token: createJWT(user),
      user,
    });
  }

  return res.status(401).send({
    status: 'FAILED',
    messsage: 'Invalid username or password',
  });
});

routes.get('/', authNeeded, (req, res) => {
  res.send({
    username: 'dave',
    admin: true,
  });
});

routes.get('/admin', adminOnly, (req, res) => {
  res.status(200).send('ok');
});

export default routes;
