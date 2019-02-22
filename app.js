const request = require("request");
const yargs = require("yargs");

//configure yargs
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

// console.log(argv);

let encodedAddress = encodeURIComponent("argv.address");
request(
  {
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=sg9QhdrU1viNICCvBfy4VH2UtBGoWUT6&location=${encodedAddress}`,
    //tell request this is a json string and convert it
    json: true
  },
  (error, response, body) => {
    //check for error
    if (error) {
      console.log("Unable to connect to Mapquest");
    } else if (body.info[0] !== 0) {
      console.log("Unable to find that address");
    }
    //pretty print object
    // console.log(JSON.stringify(body, null, 2));
    // console.log(JSON.stringify(response, null, 2));
    // console.log(JSON.stringify(error, null, 2));
    console.log(`Address: ${body.results[0].providedLocation.location}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
  }
);
