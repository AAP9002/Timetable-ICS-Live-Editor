const express = require('express');
const app = express();
const axios = require('axios');
var fs = require('fs');

/////////////////////////////////////////////// IMPORT FEATURES ////////////////////////////////////////////////

const syncForcedBreakpoint = require('./features/forcedBreakPoint.js')
const replaceTitle = require('./features/replaceCodeName.js')
const addcheckinLinks = require('./features/addcheckinLinks.js')

///////////////////////////////////////////// IMPORT FEATURES END //////////////////////////////////////////////

/////////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////

// This displays message that the server running and listening to specified port
//const port = process.env.PORT || 8080;
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

var courses = []; // Predefined courses from allCourses.md


// import courses from allCourses.md
try {
  var courses = fs.readFileSync('../allCourses.md', 'utf8').split('\n');
  //test courses are read correctly
  // for (let i = 0; i < courses.length; i++) {
  //   console.log(courses[i]);
  // }
} catch (e) {
  console.log('Error:', e.stack);
}

////////////////////////////////////////////////// SETUP END ///////////////////////////////////////////////////

///////////////////////////////////////////////// FEATURES /////////////////////////////////////////////////////

/**
 * perform modification defined by the user in stepsString
 * - example of stepsString would be "00-02"
 * - each code (e.g. "00") corresponds to one feature
 * - perform steps in order
 * @param {string} cal 
 * @param {string} stepsString 
 * @returns modified cal
 */
function performModifications(cal, stepsString) {

  const steps = stepsString.split('-')

  for (let i = 0; i < steps.length; i++) {
    let step = steps[i];
    console.log(step)

    switch (step) {
      case "00": // replace course code with just course name
        cal = replaceTitle.replaceCourseCodesWithNames(cal, courses);
        break;
      case "01": // replace course code with course code and course name
        cal = replaceTitle.replaceCourseCodesWithCodeAndNames(cal, courses);
        break;
      case "02": // force restyling of calender every 24 hours
        cal = syncForcedBreakpoint.run(cal);
        break;
      case "03": // add a checkin link in description
        cal = addcheckinLinks.insertCheckInLink(cal);
        break;
      default:
        console.log("step "+ step + " called but not defined in performModifications switch")
    }
  }

  return cal;
}

/////////////////////////////////////////////// FEATURES END////////////////////////////////////////////////////

/////////////////////////////////////////////////// API V1 /////////////////////////////////////////////////////
app.get('/api/v1/:uniqueAPI/tt.ics', function (req, res) {
  console.log("V1 API hit")

  // Decoding a UoM Timetable URL encoded value
  const { uniqueAPI } = req.params;
  const apiUrlDec = decodeURIComponent(uniqueAPI)
  //console.log(apiUrlDec)
  //console.log(testValidUrl(apiUrlDec))
  if (testValidUrl(apiUrlDec) == true)
  {
    let rebuild = "https://scientia-eu-v4-api-d3-02.azurewebsites.net//api/ical/" + apiUrlDec.split('/')[6] + "/" + apiUrlDec.split('/')[7] + "/timetable.ics";
    console.log(rebuild)

    try {
      getTimetable(rebuild).then(cal => {
        if (cal != null) {

          // steps for default V1 modifications
          let steps = "00-02"
          cal = performModifications(cal, steps);

          res.writeHead(200, {
            "Content-Type": "text/calendar",
            "Content-Disposition": "attachment; filename=tt.ics"
          })
          res.end(cal) // return response as download
        }
        else {
          throw ('Calender not received')
        }
      });
    }
    catch (e) {
      console.log(e);
      res.status(500).send("error")
    }

  }
  else {
    res.status(400).send("Invalid API URL")
  }
});

////////////////////////////////////////////////// API V1 END ///////////////////////////////////////////////////

/////////////////////////////////////////////////// API V2 /////////////////////////////////////////////////////
app.get('/api/v2/:steps/:uniqueAPIPart1/:uniqueAPIPart2/tt.ics', function (req, res) {
  console.log("V2 API hit")

  // Decoding a UoM Timetable URL encoded value
  const { steps, uniqueAPIPart1, uniqueAPIPart2 } = req.params;

  if( !containsOnlyUUID(uniqueAPIPart1) || !containsOnlyUUID(uniqueAPIPart2))
  {
    console.log("Invalid keys provided in API url")
    res.status(403).send("Invalid keys provided in API url")
  }
  else{

    let URL = "https://scientia-eu-v4-api-d3-02.azurewebsites.net//api/ical/" + uniqueAPIPart1 + "/" + uniqueAPIPart2 + "/timetable.ics";
    console.log(URL);

    try {
      getTimetable(URL).then(cal => {
        if (cal != null) {

          cal = performModifications(cal, steps)

          res.writeHead(200, {
            "Content-Type": "text/calendar",
            "Content-Disposition": "attachment; filename=tt.ics"
          })
          res.end(cal) // return response as download
        }
        else {
          throw ('Calender not received')
        }
      });
    }
    catch (e) {
      console.log(e);
      res.status(500).send("error")
    }
  }
});

////////////////////////////////////////////////// API V2 END ///////////////////////////////////////////////////

////////////////////////////////////////////// FUNDAMENTAL METHODS //////////////////////////////////////////////
/**
 * Test for valid api url
 * - checks if the url is a valid UoM api url
 * @param {string} user url 
 * @returns boolean if url valid
 */
function testValidUrl(url) {
  const validUrlPATTERN = /^https:\/\/scientia-eu-v4-api-d3-02\.azurewebsites\.net\/\/api\/ical\/[0-9a-fA-F-]+\/[0-9a-fA-F-]+\/timetable\.ics$/g; // REGEX for valid uom ics uri
  return validUrlPATTERN.test(url);
}

/**
 * Testing the parts of the API key
 * - checking there is only UUID
 * - reduce chance of Server-side request forgery
 * 
 * @param {string} inputString 
 * @returns Weather the string is a valid part
 */
function containsOnlyUUID(inputString) {
  // Regular expression to match only UUID
  const letterAndDashRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return letterAndDashRegex.test(inputString);
}

/**
 * Get remote timetable and return a string
 * @param {string} timetableUri 
 * @returns string of remote calender contents
 */
async function getTimetable(timetableUri) {
  try {
    let response = await axios({
      url: timetableUri,
      method: 'get',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status == 200) {
      return response.data;
    }
    else {
      throw ('axios failed: status ' + response.status)
    }
  }
  catch (e) {
    //console.log(e);
    return null;
  }
}

////////////////////////////////////////////// FUNDAMENTAL METHODS END //////////////////////////////////////////////