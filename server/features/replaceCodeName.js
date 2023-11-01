// Replace course codes
// @author : aap9002
// @date : 01/11/2023
// @description : Find and replace course codes with [course names] or [course code and course name]
// @params : the calender in string format
// @returns : the calender in string format


const pattern = /SUMMARY:[^\/]*\//g // REGEX to search the ICAL for the course code

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
function replaceCourseCodesWithNames(cal, courses) {
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
 * Replace course codes with code and full course names
 * @param {string} cal
 * @returns cal with replacements
 */
function replaceCourseCodesWithCodeAndNames(cal, courses) {
    // get unique course codes
    let uniqueCourseCodesArray = parseCourseCodes(cal);

    // replace course codes with names
    for (let i = 0; i < uniqueCourseCodesArray.length; i++) {
        const courseCode = uniqueCourseCodesArray[i];
        try {
            const courseName = courses.find(course => course.split(' ')[0] === courseCode).split(' ').slice(1).join(' ');
            cal = cal.split(courseCode).join(courseCode + " " + courseName);
        }
        catch (e) {
            // if the course code is not found in the allCourses.md file, log it
            console.log(courseCode + " not found in allCourses.md");
        }
    }

    return cal;
}

module.exports = {
    replaceCourseCodesWithNames,
    replaceCourseCodesWithCodeAndNames
};