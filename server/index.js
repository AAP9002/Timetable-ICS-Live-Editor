const express = require('express');
const app = express();
const axios = require('axios');
var fs = require('fs');

// This displays message that the server running and listening to specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

var courses = []; // Predefined courses from allCourses.md
const pattern = /SUMMARY:[^\/]*\//g // REGEX to search the ICAL for the course code
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

          // modification steps
          cal = replaceCourseCodesWithNames(cal);
          cal = syncForcedBreakpoint(cal);

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

/**
 * List unique course names in the string
 * @param {string} cal 
 * @returns List of unique course codes
 */
function parseCourseCodes(cal) {
  const uniqueMatches = new Set();

  let match;
  while ((match = pattern.exec(cal)) !== null) {
    //console.log(match[0].split(':')[1].split('/')[0]);
    uniqueMatches.add(match[0].split(':')[1].split('/')[0]);
  }
  const uniqueCourseCodesArray = Array.from(uniqueMatches);
  return uniqueCourseCodesArray;
}

/**
 * Replace course codes with full course names
 * @param {string} cal
 * @returns cal with replacements
 */
function replaceCourseCodesWithNames(cal) {
  // get unique course codes
  let uniqueCourseCodesArray = parseCourseCodes(cal);

  // replace course codes with names
  for (let i = 0; i < uniqueCourseCodesArray.length; i++) {
    const courseCode = uniqueCourseCodesArray[i];
    try {
      const courseName = courses.find(course => course.split(' ')[0] === courseCode).split(' ').slice(1).join(' ');
      cal = cal.split(courseCode).join(courseName);
    }
    catch (e) {
      // if the course code is not found in the allCourses.md file, log it
      console.log(courseCode + " not found in allCourses.md");
    }
  }

  return cal;
}

/**
 * Force events to update format once a day
 * @param {string} cal 
 * @returns cal with last modified date time set
 */
function syncForcedBreakpoint(cal) {
  // once a day between 01:00 and 04:00, force a refresh of the events to restyle any new formatting
  // this is as modifications to the event will not be recognised and updated unless the UoM event changes on the timetabling system itself
  // so this will manual set the last modified each day to force an update in the calender app
  // NB. it will stop doing this at 4 am so any changes in the day will be recognised and updated live
  // NB. 3 hour window set as the ICS is set to refresh evert 2 hours, so this should affect all users
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 1 && hour <= 4) {
    datestr = date.toISOString().split('T')[0];
    datestr = datestr.split('-').join('');
    datestr = "LAST-MODIFIED:" + datestr + "T000000";
    const regex = /^LAST-MODIFIED:.*/gm;
    cal = cal.replace(regex, datestr);
  }

  return cal;
}

////////////////////////////////////////////// FUNDAMENTAL METHODS END //////////////////////////////////////////////
