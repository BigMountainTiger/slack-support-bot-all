const axios = require('axios');

const ext_axios = async (options, timeout_second) => {
  const timeout_second_default = 5;
  const timeout = (timeout_second || timeout_second_default) * 1000;
  const CancelToken = axios.CancelToken;

  const source = CancelToken.source();
  const tm = setTimeout(() => { source.cancel(`Cancelled after ${timeout}ms.`); }, timeout);

  options.cancelToken = source.token;

  try {
    return await axios(options);
  } finally { clearTimeout(tm); }
};

module.exports = ext_axios;