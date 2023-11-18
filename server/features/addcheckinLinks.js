// Add checkin links to Description for all courses
// @author : SichengPan
// @date : 16/11/2023
// @description : Add checkin links to the description part of .ics files for all courses
// @params : the calender in string format

/**
 * Insert checkin links to all courses in Description part
 * @param {string} cal 
 * @returns Courses with checkin links
 */

function insertCheckInLink(cal) {
    console.log("test")

    /*
    const eventDescriptionPattern = /(DESCRIPTION:Event type:.*?\\n)(Location:.*?\\n)/gs;
    const checkInLink = "Please Checkin (International Students): https://www.studentsupport.manchester.ac.uk/immigration-and-visas/visacheckin/\n";
    */
    //const descriptionPattern = /(DESCRIPTION:)(Event type)/g;
    const descriptionPattern = /DESCRIPTION:/g
    const checkInLink = "DESCRIPTION:Please Checkin (International Students): https://www.studentsupport.manchester.ac.uk/immigration-and-visas/visacheckin/\\n";


    //if (cal.match(eventDescriptionPattern)) {
    if (cal.match(descriptionPattern)) {
      //return cal.replace(eventDescriptionPattern, `$1\n${checkInLink}$2`);
      cal = cal.replace(descriptionPattern, `${checkInLink}`);
      console.log(cal);
    } else {
      console.warn("No event description match found!");
    }

    return cal;
  }
  
  module.exports = { insertCheckInLink };