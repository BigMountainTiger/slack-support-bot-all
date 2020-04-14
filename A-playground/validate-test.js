require('dotenv').config();
const axios = require('axios');
const CancelToken = axios.CancelToken;

const BOT_TOKEN = process.env.BOT_TOKEN;

const getCancelToken = () => {
  let source = CancelToken.source();
  setTimeout(() => { source.cancel('Timeout'); }, 3 * 1000);

  return source.token;
};

const validate_slack = async () => {
  const url = 'https://slack.com1/api/auth.test';

  const options = {
    method: 'GET',
    cancelToken: getCancelToken(),
    headers: { Authorization: 'Bearer ' + BOT_TOKEN },
    url: url,
  };

  try {
    const res = await axios(options);
    return res.data
  } catch(e) {
    return e;
  }
};

(async () => {
  let slack_data = await validate_slack();

  console.log({
    slack_data: slack_data
  });
})();

console.log('Initiated ...');