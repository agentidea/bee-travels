/**
 * Service for getting currency name and short
 * 3 char code by country/terrirory name 
 * from CSV file in data dir
 *  
 */
import { parse } from "fast-csv";
import { createReadStream } from "fs";

function getCountryCurrencyMetadata(countryOrTerritory) {
  const fileStream = createReadStream(process.env.INIT_CWD + "/data/countryCurrencyMetadata.csv");
  const parser = parse({ headers: true });

  return new Promise(function (resolve) {
    if (countryOrTerritory) {
      var cityData;
      fileStream
        .pipe(parser)
        .on("error", error => console.error(error))
        .on("readable", () => {
          for (let row = parser.read(); row; row = parser.read()) {
            var tempCity = JSON.parse(JSON.stringify(row)).city;
            var tempCountry = JSON.parse(JSON.stringify(row)).country;

            if (city == tempCity && country == tempCountry) {
              cityData = JSON.parse(JSON.stringify(row));
            }
          }
        })
        .on("end", () => {
          resolve(cityData);
        }
        );
    } else {
      var cities = [];

      fileStream
        .pipe(parser)
        .on("error", error => console.error(error))
        .on("readable", () => {
          for (let row = parser.read(); row; row = parser.read()) {
            var city = JSON.parse(JSON.stringify(row)).city;
            var country = JSON.parse(JSON.stringify(row)).country;
            cities.push({ city, country });
          }
        })
        .on("end", () => {
          resolve({ cities: cities });
        }
        );
    }


  });
}

export { getCountryCurrencyMetadata };
