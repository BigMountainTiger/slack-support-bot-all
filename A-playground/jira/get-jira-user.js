// https://community.atlassian.com/t5/Answers-Developer-Questions/Create-New-Users-using-JIRA-REST-API/qaq-p/541525

require('dotenv').config({ path: __dirname + '/../.env' });

const axios = require('axios');
const CancelToken = axios.CancelToken;

const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;

// const getCancelToken = (seconds) => {
//   let source = CancelToken.source();
//   setTimeout(() => { source.cancel('Timeout'); }, seconds * 1000);

//   return source.token;
// };

const get_jira_user = async (email) => {
  const url = `https://mlg-playground.atlassian.net/rest/api/2/user/search?query=${escape(email)}`;

  const source = CancelToken.source();
  const timeoutHandle = setTimeout(() => { source.cancel('Timeout'); }, 3 * 1000);

  const options = {
    method: 'GET',
    cancelToken: source.token,
    auth: { username: JIRA_AUTH_EMAIL, password: JIRA_AUTH_TOKEN },
    url: url,
  };

  let res = {};
  try {

    res = await axios(options);
  } 
  catch(e) {

    console.log('Error');
    return {};
  } 
  finally {
    console.log('clearTimeout');
    clearTimeout(timeoutHandle);
  }

  return res.data;
};

(async () => {

  //const data = await get_jira_user('song@monsterlg.com');
  //const data = await get_jira_user('andre@monsterlg.com');
  const data = await get_jira_user('ashley@monsterlg.com');
  
  console.log(data);

})();

console.log('Initiated ...');