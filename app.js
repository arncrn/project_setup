const middleware = require("./lib/middleware");
const express = require("express");
const app = express();
const data = require('./providers.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

// console.log(data[0]);

// 1. filter data for last name, return list of doctors
// {
//   npi: null,
//   first_name: '',
//   last_name: 'Gray',
//   specialty: 'Orthopedic Surgery',
//   locations: [
//     {
//       address1: '1500 Owens St',
//       address2: '',
//       city: 'San Francisco',
//       state: 'CA'
//     }
//   ]
// }

const filterByLastName = (lastName) => {
  if (!lastName) return {...data};

  return data.filter(doctorObj => {
    return doctorObj.last_name.toLowerCase() === lastName.toLowerCase();
  });
}

const filterByAddress1 = (address1, doctorList) => {
  if (!address1) return doctorList;

  return doctorList.filter(doctorObj => {
    let locations = doctorObj.locations;

    for (let i = 0; i < locations.length; i += 1) {
      let location = locations[i];
      if (location.address1.toLowerCase() === address1.toLowerCase()) {
        return true;
      }
    }
  });
}





app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
})

app.get('/doctors', (req, res) => {
  const lastName = req.query.last_name;
  const address1 = req.query.address1;

  let doctorsByLastName = filterByLastName(lastName);
  let doctorsByAddress1 = filterByAddress1(address1, doctorsByLastName);

  res.send(doctorsByAddress1);
})

module.exports = app;





{"npi":null,"first_name":"Adam","last_name":"Schickedanz","specialty":"General Practice,Pediatrics","locations":[{"address1" : "1001 Potrero Ave", "address2" : " ", "city" : "San Francisco", "state" : "CA"}]}, 

trie


doctor
  first_lame, last_name, 



shared table options
  specialties
  states
  cities 
  address 

