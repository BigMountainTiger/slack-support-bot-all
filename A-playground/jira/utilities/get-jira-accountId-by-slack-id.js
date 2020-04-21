require('dotenv').config({ path: __dirname + '/../../.env' });

const ext_axios = require('../../common/ext-axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const SLACK_GET_USER_URL = 'https://slack.com/api/users.info?user=${slack-id}'

const JIRA_AUTH_EMAIL = process.env.JIRA_AUTH_EMAIL;
const JIRA_AUTH_TOKEN = process.env.JIRA_AUTH_TOKEN;
const JIRA_GET_USER_URL = 'https://mlg-playground.atlassian.net/rest/api/2/user/search?query=${email-address}';

const get_slack_user = async (slackId) => {
  const url = SLACK_GET_USER_URL.replace('${slack-id}', escape(slackId));

  const options = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + BOT_TOKEN },
    url: url,
  };

  return await ext_axios(options);
};

const get_jira_user = async (email) => {
  const url = JIRA_GET_USER_URL.replace('${email-address}', escape(email));

  const options = {
    method: 'GET',
    auth: { username: JIRA_AUTH_EMAIL, password: JIRA_AUTH_TOKEN },
    url: url,
  };

  return await ext_axios(options);
};

const get_jira_accountId_by_slack_id = async (slackId) => {
  const result = { user: {}, error: null };

  try {
    const res = await get_slack_user(slackId);
    const email = (res.data.user.profile.email || '').trim().toLowerCase() || null;

    if (! email) {
      result.error = {
        message: 'Slack is unable to get the user information'
      };
      return result;
    }

    result.user.email = email;

  } catch(e) {

    result.error = {
      error: e,
      message: 'Unable to communicate to slack to get the user information'
    };
    return result;
  }

  // const email = result.user.email;
  const email = 'song-001@monsterlg.coM';
  try {
    const res = await get_jira_user(email);
    let data = res.data;
    console.log(Array.isArray(data));
    console.log(data);
  } catch(e) {

    result.error = {
      error: e,
      message: 'Unable to communicate to Jira to get the user information'
    };
    return result;
  }

  
  return result;
};

(async () => {

  const slackId = 'U01023BN1MX';

  const result = await get_jira_accountId_by_slack_id(slackId);
  console.log(result);

})();

console.log('Initiated ...');
