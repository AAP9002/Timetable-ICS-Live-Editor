const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// courses
const courses = [
    "COMP23311 Software Engineering 1",
    "COMP23412 Software Engineering 2",
    "COMP26020 Programming Languages & Paradigms",
    "COMP26120 Algorithms and Data Structures",
    "COMP2CARS COMP - Careers Yr 2",
    "BMAN10011 Fundamentals of Management",
    "BMAN10252 Fundamentals of Technological Change",
    "BMAN10552 Fundamentals of Finance",
    "BMAN10612 Business Economics",
    "BMAN10621B Fundamentals of Financial Reporting B",
    "BMAN10632 Fundamentals of Management Accounting",
    "BMAN20022 Work Psychology for Career Success",
    "BMAN20242 Introduction to Corporate Finance and Financial Instruments",
    "BMAN20792 Technology, Strategy and Innovation",
    "BMAN20821 New Product Development and Innovation",
    "BMAN20832 Marketing",
    "BMAN21012 Global Contexts of Business and Management",
    "BMAN22000 Firms and Management in Comparative Perspective",
    "BMAN24521 Organisations and Employment",
    "COMP21111 Logic and Modelling",
    "COMP22111 Processor Microarchitecture",
    "COMP22712 Microcontrollers",
    "COMP23111 Database Systems",
    "COMP24011 Introduction to AI",
    "COMP25212 System Architecture",
    "COMP27112 Introduction to Visual Computing",
    "COMP28112 Distributed Systems",
    "MCEL10001 Exploring Enterprise",
    "MCEL10002 Entrepreneurial Skills"
]


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