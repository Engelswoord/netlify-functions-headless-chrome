const api_key = process.env.API_KEY;

module.exports = (event, context) => {
  console.dir(event.headers)
  if (event.headers.Authorization !== 'undefined' && event.headers.Authorization === api_key) {
    return true;
  }
  console.log('unauthorized')
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))
  return false;
}
