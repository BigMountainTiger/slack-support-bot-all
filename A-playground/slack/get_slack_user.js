require('dotenv').config({ path: __dirname + '/../.env' });

const axios = require('axios');
const CancelToken = axios.CancelToken;

const BOT_TOKEN = process.env.BOT_TOKEN;

const getCancelToken = (seconds) => {
  let source = CancelToken.source();
  setTimeout(() => { source.cancel(); }, seconds * 1000);

  return source.token;
};

const get_slack_user = async () => {
  const url = `https://slack.com/api/users.info?user=${escape('U01023BN1MX')}`;

  const options = {
    method: 'GET',
    cancelToken: getCancelToken(3),
    headers: { Authorization: 'Bearer ' + BOT_TOKEN },
    url: url,
  };

  const res = await axios(options);
  return res.data;

};

(async () => {
  
  const data = await get_slack_user();
  console.log(data.user.profile.email);

})();

console.log('Initiated ...');