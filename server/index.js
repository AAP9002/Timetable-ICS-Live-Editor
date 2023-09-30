const express = require('express');
const app = express();
const axios = require('axios');
var fs = require('fs');
const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// import courses from allCourses.md
var courses = [];
try {  
    var courses = fs.readFileSync('allCourses.md', 'utf8').split('\n');
    // test courses are read correctly
    // for (let i = 0; i < courses.length; i++) {
    //   console.log(courses[i]);
    // }
} catch(e) {
    console.log('Error:', e.stack);
}

// regex to search the ICAL for the course code
const pattern = /SUMMARY:[^\/]*\//g

app.get('/api/v1/:uniqueAPI/tt.ics', function(req, res) {
  const { uniqueAPI } = req.params;
  
  var apiUrlDec = decodeURIComponent(uniqueAPI) // Decoding a UoM Timetable URL encoded value
  console.log("V1 API hit")
  console.log(apiUrlDec)

  axios.get(apiUrlDec)
  .then(response => {
    //HTTP Head
    res.writeHead(200, {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=tt.ics"
      })

    let cal = response.data;
    // FInd all unique course codes in the ICS file
    const uniqueMatches = new Set();

    let match;
    while ((match = pattern.exec(cal)) !== null) {
      //console.log(match[0].split(':')[1].split('/')[0]);
      uniqueMatches.add(match[0].split(':')[1].split('/')[0]);
    }
    const uniqueCourseCodesArray = Array.from(uniqueMatches);
    //console.log(uniqueCourseCodesArray);

    // for each unique course code, find the course name and replace the course code with the course name
    for (let i = 0; i < uniqueCourseCodesArray.length; i++) {
      const courseCode = uniqueCourseCodesArray[i];
      try{
        const courseName = courses.find(course => course.split(' ')[0] === courseCode).split(' ').slice(1).join(' ');
        cal = cal.split(courseCode).join(courseName);
      }
      catch(e){
        // if the course code is not found in the allCourses.md file, log it
        console.log(courseCode + " not found in allCourses.md");
      }
    }

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
      datestr = "LAST-MODIFIED:"+datestr+"T000000";
      const regex = /^LAST-MODIFIED:.*/gm;
      cal = cal.replace(regex, datestr);
    }

    res.end(cal) // return response as download
  });

});