export default (request, response) => {
  const { name } = request.query;
  response.status(200).send(`Hellooooo ${name}!`);
};
