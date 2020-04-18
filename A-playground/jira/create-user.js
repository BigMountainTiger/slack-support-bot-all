// https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#api-rest-api-3-user-post

require('dotenv').config({ path: __dirname + '/../.env' });

const axios = require('axios');
const CancelToken = axios.CancelToken;

const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;


const create_jira_user = async (email) => {
  const url = `https://song-li-experiment.atlassian.net/rest/api/2/user`;

  const source = CancelToken.source();
  const timeoutHandle = setTimeout(() => { source.cancel('Timeout'); }, 10 * 1000);

  const data = {
    emailAddress: 'song4@monsterlg.com',
    displayName: 'Song Li - 4'
  };

  const options = {
    method: 'POST',
    cancelToken: source.token,
    auth: { username: 'da_tou_li@yahoo.com', password: 'BQBR3jOpcPRnnwqiuek28358' },
    url: url,
    data: data
  };

  let res = {};
  try {

    res = await axios(options);
  } catch(e) {

    console.log(e);
    return {};

  } finally {
    console.log('clearTimeout');
    clearTimeout(timeoutHandle);
  }

  return res;
};

(async () => {

  const data = await create_jira_user('song@monsterlg.com');
  console.log(data.data);

})();

console.log('Initiated ...');