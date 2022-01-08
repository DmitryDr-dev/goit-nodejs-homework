export async function logOutUser(req, res, next) {
  console.log('logging', req);

  res.status(200).json('Message');
}
