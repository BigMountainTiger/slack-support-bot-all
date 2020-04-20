// https://developer.atlassian.com/cloud/jira/platform/rest/v3/?utm_source=%2Fcloud%2Fjira%2Fplatform%2Frest%2F&utm_medium=302#api-rest-api-3-user-post
// https://admin.atlassian.com/


require('dotenv').config({ path: __dirname + '/../.env' });

const axios = require('axios');
const CancelToken = axios.CancelToken;

const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;


const create_jira_user = async (email) => {
  const url = `https://mlg-playground.atlassian.net/rest/api/2/user`;

  const source = CancelToken.source();
  const timeoutHandle = setTimeout(() => { source.cancel('Timeout'); }, 10 * 1000);

  const no = '001';
  const data = {
    emailAddress: `song-${no}@monsterlg.com`,
    displayName: `Dummy-song-li-${no}`
  };

  const options = {
    method: 'POST',
    cancelToken: source.token,
    auth: { username: JIRA_AUTH_EMAIL, password: JIRA_AUTH_TOKEN },
    url: url,
    data: data
  };

  let res = {};
  try {

    res = await axios(options);
  } catch(e) {

    let r = e.response;
    let d = r.data;
    console.log(d);
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