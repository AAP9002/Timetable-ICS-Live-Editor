const express = require('express');
const app = express();
const axios = require('axios');
var fs = require('fs');

/////////////////////////////////////////////// IMPORT FEATURES ////////////////////////////////////////////////

const syncForcedBreakpoint = require('./features/forcedBreakPoint.js')
const replaceTitle = require('./features/replaceCodeName.js')


///////////////////////////////////////////// IMPORT FEATURES END //////////////////////////////////////////////


/////////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////

// This displays message that the server running and listening to specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

var courses = []; // Predefined courses from allCourses.md
const validUrlPATTERN = /^https:\/\/scientia-eu-v4-api-d3-02\.azurewebsites\.net\/\/api\/ical\/[0-9a-fA-F-]+\/[0-9a-fA-F-]+\/timetable\.ics$/g; // REGEX for valid uom ics uri


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

/////////////////////////////////////////////////// API V1 /////////////////////////////////////////////////////
app.get('/api/v1/:uniqueAPI/tt.ics', function (req, res) {
  console.log("V1 API hit")

  // Decoding a UoM Timetable URL encoded value
  const { uniqueAPI } = req.params;
  const apiUrlDec = decodeURIComponent(uniqueAPI)
  //console.log(apiUrlDec)

  if (testValidUrl(apiUrlDec)) {
    let rebuild = "https://scientia-eu-v4-api-d3-02.azurewebsites.net//api/ical/" + apiUrlDec.split('/')[6] + "/" + apiUrlDec.split('/')[7] + "/timetable.ics";
    console.log(rebuild)

    try {
      getTimetable(rebuild).then(cal => {
        if (cal != null) {

          ////// modification steps //////
          cal = replaceTitle.replaceCourseCodesWithNames(cal, courses);
          cal = syncForcedBreakpoint.run(cal);
          //// modification steps end ////

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

////////////////////////////////////////////// FUNDAMENTAL METHODS //////////////////////////////////////////////
/**
 * Test for valid api url
 * - checks if the url is a valid UoM api url
 * @param {string} user url 
 * @returns boolean if url valid
 */
function testValidUrl(url) {
  return validUrlPATTERN.test(url);
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
