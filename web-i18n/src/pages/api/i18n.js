'use server'
const fetchLocaleData = async (locale) => {
  const options = {
    headers: {
      Authorization: 'token wlu_7ismK4ZMYpBHq7qc5rL7Zz4rJngFJhJuBq72',
      'Access-Control-Allow-Origin': '*',
      "accept": "application/json, text/plain, /",
      mode: 'cors'
    }
  };

  const data = await fetch(`http://weblate.localhost.com/api/translations/clin/glossary/${locale.replace('-', '_')}/units/?format=json`, options)
    .then(response => response.json())
    .then((res) => {
      console.log('got around here', res)
      const {results} = res
      return results.reduce((acc, {context: key, target}) => {
        // const {key, value} = attributes
        acc[key] = target[0];
        return acc;
      }, {})
    })
    .catch(err => console.error(err));
  return data
}

export default async function handler(req, res) {
  console.log('getting through here', req.query)
  const {locale} = req.query
  try {
    const result = await fetchLocaleData(locale)
    res.status(200).json({result})
  } catch (err) {
    res.status(500).json({error: 'failed to load data'})
  }
}