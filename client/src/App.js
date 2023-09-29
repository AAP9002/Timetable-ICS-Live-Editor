import './App.css';
import { useState } from 'react';
// import { AddToCalendarButton } from 'add-to-calendar-button-react';

function App() {
  const [uomAPI, setUomAPI] = useState("");
  const newIcsUri = "https://timetablereplacer.onrender.com/api/v1/" + encodeURIComponent(uomAPI)+"/tt.ics"; 

  return (
    <div className="App">
      <h1>Timetable ICS Live Editor</h1>
      <br/>
      <h2>STEP 1: Enter your UoM API URL</h2>
      <ol style={{width:"fit-content", margin:"auto"}}>
        <li>Visit <a href='https://timetables.manchester.ac.uk/timetables' target='_blank' rel='noreferrer'>https://timetables.manchester.ac.uk/timetables</a></li>
        <li>Sign In</li>
        <li>Click on the <b>Subscribe</b> button</li>
        <l1>Click on <b>More</b></l1>
        <li>Click on <b>Copy</b></li>
        <li>Paste the URL into the box below</li>
      </ol>
      <input type="text" placeholder="Enter UoM API URL" onChange={(e) => setUomAPI(e.target.value)} style={{width:"80%", padding:"10px",margin:"30px"}} />
      <br/>

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
        
      <h2> STEP 2: Add to calender</h2>
      <p>Most calendar apps enable you to subscribe using a URL. Copy the URL below and follow your calendar app's subscription instructions.</p>
      <p style={{margin:"20px",fontWeight:"bold",padding:"20px"}}>{newIcsUri}</p>

      <h2>Open to contributions</h2>
      <p>PRs are welcome, please feel free to add courses, add a feature or fix a bug</p>
      <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/'>https://github.com/AAP9002/Timetable-ICS-Live-Editor/</a>
      <br/>
      <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/blob/main/server/index.js'>Link to js file with courses</a>

    </div>
  );
}

export default App;
