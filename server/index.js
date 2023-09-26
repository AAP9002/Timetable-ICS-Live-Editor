const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

const icsLink = process.env.ICS_LINK;

console.log(icsLink);

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

app.get('/api/tt.ics', function(req, res) {
  axios.get(icsLink)
  .then(response => {
    res.writeHead(200, {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=timetable.ics"
      })

    let cal = response.data;
    for (let i = 0; i < courses.length; i++) {
        cal = cal.replaceAll(courses[i].split(' ')[0], courses[i]);
    }


    res.end(cal)
  });

});