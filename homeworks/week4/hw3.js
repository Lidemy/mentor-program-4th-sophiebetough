const request = require('request');
const process = require('process');

request.get(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    if (response.statusCode >= 400 && response.statusCode < 500) {
      console.log(response.statusCode, '找不到國家資訊');
    } else {
      let countryInfo;
      try {
        countryInfo = JSON.parse(body);
        for (let i = 0; i < countryInfo.length; i += 1) {
          console.log('============');
          console.log(`國家：${countryInfo[i].name}`);
          console.log(`首都：${countryInfo[i].capital}`);
          console.log(`貨幣：${countryInfo[i].currencies[0].code}`);
          console.log(`國碼：${countryInfo[i].callingCodes}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
);
