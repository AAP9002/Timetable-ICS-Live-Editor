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


app.get('/api/v1/:uniqueAPI/tt.ics', function(req, res) {
  const { uniqueAPI } = req.params;
  
  var apiUrlDec = decodeURIComponent(uniqueAPI) // Decoding a UoM Timetable URL encoded value
  console.log(apiUrlDec)

  axios.get(apiUrlDec)
  .then(response => {
    //HTTP Head
    res.writeHead(200, {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=tt.ics"
      })

    // foreach course, replace code with name
    // NB. if course list grows, it may be more efficient to store all courses in a DICT and only replace them
    let cal = response.data;
    for (let i = 0; i < courses.length; i++) {
        cal = cal.split(courses[i].split(' ')[0]).join(courses[i].split(' ').slice(1).join(' '));
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