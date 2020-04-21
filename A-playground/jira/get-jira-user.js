// https://community.atlassian.com/t5/Answers-Developer-Questions/Create-New-Users-using-JIRA-REST-API/qaq-p/541525

require('dotenv').config({ path: __dirname + '/../.env' });

const ext_axios = require('../common/ext-axios');

const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;

const get_jira_user = async (email) => {
  const url = `https://mlg-playground.atlassian.net/rest/api/2/user/search?query=${escape(email)}`;

  const options = {
    method: 'GET',
    auth: { username: JIRA_AUTH_EMAIL, password: JIRA_AUTH_TOKEN },
    url: url,
  };

  let res = await ext_axios(options);

  return res.data;
};

(async () => {

  const data = await get_jira_user('song-004@monsterlg.com');
  //const data = await get_jira_user('andre@monsterlg.com');
  //const data = await get_jira_user('ashley@monsterlg.com');
  
  console.log(data);

})();

console.log('Initiated ...');