import './App.css';
import { useState } from 'react';

function App() {
  const [uomAPI, setUomAPI] = useState("");
  const newIcsUri = "https://timetablereplacer.onrender.com/api/v1/" + encodeURIComponent(uomAPI)+"/tt.ics"; 

  const googleAPIcall = "https://calendar.google.com/calendar/u/0/r?cid="+newIcsUri;

  return (
    <div className="App">
      <h1>Timetable ICS Live Editor</h1>
      <br/>
      <p>Enter your UoM API URL</p>
      <input type="text" placeholder="Enter UoM API URL" onChange={(e) => setUomAPI(e.target.value)} />
      <br/>
      <a href={googleAPIcall}>Add to google calender</a>
      <p>{newIcsUri}</p>
    </div>
  );
}

export default App;
