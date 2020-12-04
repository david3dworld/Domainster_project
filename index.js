require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const axios = require('axios');


app.use('/assets',express.static(__dirname + '/assets'));
console.log(__dirname+ '/assets');
app.set('view engine', 'ejs');



const getData = async () => {
  try {
    let url = "http://dev8.domainster.com/com";
    let options={
       secret:'vIIiqhUVN04',
       req: 'find.domain',
       domain:'mick.com'
     }
      const res = await axios.post(url, options);
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
      return res.data;
  } catch (err) {
      console.error(err);
  }
};

app.get('/', (req, res) => {
  const response =  getData();
    console.log('responst',response);
  // http.request(options, function(res) {
  //     console.log('res',res);
  // });
  res.render('pages/domaininfo', {
    data: {
      IP: '198.127.11.2',
      acquired:'201212',
      owner:'kirpal thakur',
      actMarkt:'Y',
      partBrand:'Y',
      useAcronym:'Y',
      useAirline:'Y',
      useApps:'Y',
      useElectronics:'Y',
      useBank:'Y',
      useElectronics:'Y',
      useFirstName:'Y',
      useLastName:'Y',
      useManufacturing:'Y',
      useMedia:'Y',
      useLastName:'Y',
      usePlace:'Y',
      useRealEstate:'Y',
      useRestaurant:'Y',
      useServices:'Y',
      useSoftware:'Y',
      useTravel:'Y',
      domain:(response.domain !== undefined) ? response.domain : '',
    },
  });
});

app.listen(process.env.PORT || 3000);
