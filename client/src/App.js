import './App.css';
import { useState } from 'react';
import beforeImage from './images/Before.jpeg'
import afterImage from './images/After.jpeg'
import logo from './images/Logo3.png'

// import { AddToCalendarButton } from 'add-to-calendar-button-react';

function App() {
  const [uomAPI, setUomAPI] = useState("");
  const newIcsUri = "https://timetablereplacer.onrender.com/api/v1/" + encodeURIComponent(uomAPI) + "/tt.ics";

  return (
    <div className="App">
      <img src={logo} alt="Timetable ICS Live Editor"/>
      <p>Time table editor designed to change your course codes to the actual course name. Available for University Of Manchester <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/00560/bsc-computer-science/'>Computer Science</a> and <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/00609/bsc-microbiology/'>Microbiology.</a></p>
      <div className='d-flex' style={{maxWidth:'800px'}}>
        <div className='col-md-6'>
          <p style={{fontSize:"25px"}}>Before</p>
          <img className='w-100' src={beforeImage} alt="Events before T-I-L-E"></img>
        </div>
        <div className='col-md-6'>
          <p style={{fontSize:"25px"}}>After</p>
          <img className='w-100' src={afterImage} alt="Events after T-I-L-E"></img>
        </div>
      </div>

      <br />
      <h2 style={{ padding: "25px 0px 30px 0px" }}>STEP 1: Enter your UoM API URL</h2>
      <ol style={{ width: "fit-content", margin: "auto", padding: "0px 0px 40px 0px" }}>
        <li>Visit <a href='https://timetables.manchester.ac.uk/timetables' target='_blank' rel='noreferrer'>https://timetables.manchester.ac.uk/timetables</a></li>
        <li>Sign In</li>
        <li>Click on the <b>Subscribe</b> button</li>
        <l1>Click on <b>More</b></l1>
        <li>Click on <b>Copy</b></li>
        <li>Paste the URL into the box below</li>
      </ol>
      <input type="text" placeholder="Enter UoM API URL" onChange={(e) => setUomAPI(e.target.value)} style={{ minWidth: "80%" }} />
      <br />

      {/* <AddToCalendarButton
        name="Sample Event"
        startDate="2023-10-13"
        startTime="10:15"
        endTime="17:45"
        timeZone="Europe/London"
        icsFile={newIcsUri}
        subscribe
        options="'Apple','Google','iCal','Outlook.com','Yahoo','MicrosoftTeams','Microsoft365'"
              /> */}

      <h2 style={{ padding: "40px 0px 30px 0px" }}> STEP 2: Add to calender</h2>
      <p>Most calendar apps enable you to subscribe using a URL. Copy the URL below and follow your calendar app's subscription instructions.</p>
      <p style={{ fontWeight: "bold", minWidth: "80%", overflowWrap: "anywhere"}}>{newIcsUri}</p>

      <h2 style={{ padding: "40px 0px 30px 0px" }}> STEP 3: Optional</h2>
      <p>Enter your email so we can alert you with any major issues or updates (it will not be used for spam, only when there is a problem with keeping your timetable up to date!)</p>
      <iframe title='Mailing list' src="https://docs.google.com/forms/d/e/1FAIpQLScIt5gAkHQxIrGUomY-IaFZvG8jFXHk72oTsLY3PsssLbAWLw/viewform?embedded=true" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      <h2 style={{ padding: "40px 0px 40px 0px" }}>Open to contributions</h2>
      <p>PRs are welcome, please feel free to add courses, add a feature or fix a bug</p>
      <p>Github Repo: <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/'>https://github.com/AAP9002/Timetable-ICS-Live-Editor/</a></p>
      <br />
      <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/blob/main/server/allCourses.md'>Contribute by adding courses here</a>

      <footer className='w-100' style={{paddingTop:"30px", paddingBottom:"50px", borderTop:"solid",marginTop:"20px"}}>
        <p><a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/wiki'>Timetable-ICS-Live-Editor (T-I-L-E)</a> &#169; <a href='https://www.linkedin.com/in/alan-prophett/'>Alan Prophett</a></p>
      </footer>
    </div>
  );
}

export default App;
