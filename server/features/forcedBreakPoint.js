// Forcing calenders to update events once a day
// @author : aap9002
// @date : 01/11/2023
// @description : once a day between 01:00 and 04:00, force a refresh of the events to restyle any new formatting
// @params : the calender in string format
// @returns : the calender in string format
// @notes : Be aware the time is based on the server time not UTC

/**
 * Force events to update format once a day
 * @param {string} cal 
 * @returns cal with last modified date time set
 */
function run(cal) {
    // once a day between 01:00 and 04:00, force a refresh of the events to restyle any new formatting
    // this is as modifications to the event will not be recognised and updated unless the UoM event changes on the timetabling system itself
    // so this will manual set the last modified each day to force an update in the calender app
    // NB. it will stop doing this at 4 am so any changes in the day will be recognised and updated live
    // NB. 3 hour window set as the ICS is set to refresh evert 2 hours, so this should affect all users
    const regex = /^LAST-MODIFIED:.*/gm;
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 1 && hour <= 4) {
        datestr = date.toISOString().split('T')[0];
        datestr = datestr.split('-').join('');
        datestr = "LAST-MODIFIED:" + datestr + "T000000";
        cal = cal.replace(regex, datestr);
    }

    return cal;
}

module.exports = {
    run,
};