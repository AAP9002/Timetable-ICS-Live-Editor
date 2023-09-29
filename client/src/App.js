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
        
      <h2> STEP 2: Manual Subscription - Add this URL as a subscription calender on your preferred calendar app</h2>
      <p>{newIcsUri}</p>
      <button onClick={navigator.clipboard.writeText({newIcsUri})}>Copy to clipboard</button>
    </div>
  );
}

export default App;
