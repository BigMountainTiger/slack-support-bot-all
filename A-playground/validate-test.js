require('dotenv').config();

(async () => {
  const p = new Promise((rs, rj) => {
    setTimeout(() => {
      rs('OK');
    }, 1000);
  });

  const r = await p;
  console.log(r);
})();

console.log('Initiated ...');