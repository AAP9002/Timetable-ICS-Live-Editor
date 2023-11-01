import './App.css';
import { useState } from 'react';
import beforeImage from './images/Before.jpeg'
import afterImage from './images/After.jpeg'
import logo from './images/Logo3.png'
import ghLogo from './images/github-mark.png'
import settingsIcon from './images/settings icon publish.png'
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import NavBar from './components/NavBar'

function App() {
  const [uomAPI, setUomAPI] = useState("");
  const[hiddenManual, setHiddenManual] = useState(true);
  const newIcsUri = "https://tile.alan-p.com/api/v1/" + encodeURIComponent(uomAPI) + "/tt.ics";

  const toggleHiddenManual = () => {
    setHiddenManual(!hiddenManual);
  }

  return (
    <div className="App">
      <NavBar/>
      <img src={ghLogo} alt='github logo' style={{position:'absolute', top:'10px', right:'10px', margin:'15px', border:'0px', zIndex:'1000', width:'50px', cursor:'alias'}} onClick={(e)=>{window.location="https://github.com/AAP9002/Timetable-ICS-Live-Editor/"}}/>
      <img id="logo"src={logo} alt="Timetable ICS Live Editor" className='w-100' style={{maxWidth:'600px'}}/>
      <p>Time table editor designed to change your course codes to the actual course name.</p>
      <p>Available for University Of Manchester, please see <a href='#contribute'>supported courses</a>.</p>
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
      <h2 id='stepOne' className='mt-5'>STEP 1: Enter your UoM API URL</h2>
      <ol id='steps' style={{ width: "100vw", maxWidth:"500px", margin: "auto", padding: "0px 0px 40px 0px" }}>
        <li>1 . Visit <a href='https://timetables.manchester.ac.uk/timetables' target='_blank' rel='noreferrer'>https://timetables.manchester.ac.uk/timetables</a></li>
        <li>2 . Sign In</li>
        <li>3 . Click on the <b>Subscribe</b> button <b className='onMobileSteps'>(located in the top right menu <img src={settingsIcon} alt="settings icon"/> )</b></li>
        <li>4 . Click on <b>More</b></li>
        <li>5 . Click on <b>Copy</b></li>
        <li>6 . Paste the URL into the box below</li>
      </ol>
      <input type="text" placeholder="Enter UoM API URL" onChange={(e) => {setUomAPI(e.target.value); setHiddenManual(true);}} style={{ minWidth: "80%" }} />
      <br />

      <h2 className="mt-5"> STEP 2: Add to calender</h2>
      {uomAPI.endsWith('.ics')?<>
      <p>Select your preferred calender app</p>
        <AddToCalendarButton
          name="Sample Event"
          startDate="2023-10-13"
          startTime="10:15"
          endTime="17:45"
          timeZone="Europe/London"
          icsFile={newIcsUri}
          subscribe
          options="'Apple','Google','iCal','Outlook.com','Yahoo','MicrosoftTeams','Microsoft365'"
        />
        <btn className="btn btn-link" onClick={toggleHiddenManual}>set up manually</btn>
        </>:<p>Please enter a valid UoM Timetable link in step 1</p>}
        {hiddenManual?null:<>
      <p>Most calendar apps enable you to subscribe using a URL. Copy the URL below and follow your calendar app's subscription instructions.</p>
      <p style={{ fontWeight: "bold", minWidth: "80%", overflowWrap: "anywhere"}}>{newIcsUri}</p>
      </>}

      <h2 className='mt-5'> STEP 3: Optional</h2>
      <p>Enter your email so we can alert you with any major issues or updates (it will not be used for spam, only when there is a problem with keeping your timetable up to date!)</p>
      <iframe title='Mailing list' src="https://docs.google.com/forms/d/e/1FAIpQLScIt5gAkHQxIrGUomY-IaFZvG8jFXHk72oTsLY3PsssLbAWLw/viewform?embedded=true" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      <h2 id='contribute' className='mt-5'>Open to contributions</h2>
      <p>PRs are welcome, please feel free to add courses, add a feature or fix a bug</p>
      <p>Github Repo: <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/'>https://github.com/AAP9002/Timetable-ICS-Live-Editor/</a></p>
      <br />
      <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/blob/main/allCourses.md'>Contribute by adding courses here</a>

      <h2 id='supported' className='mt-5'>Supported Courses</h2>
      <p>T-I-L-E is available for a limited number of courses at UoM, you can add yours <a href='https://github.com/AAP9002/Timetable-ICS-Live-Editor/blob/main/allCourses.md'>on github</a>.</p>
      <p>So far, we support:</p>
      <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/00560/bsc-computer-science/' target='_blank' rel="noreferrer" >Computer Science</a>
      <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/00609/bsc-microbiology/' target='_blank' rel="noreferrer" >Microbiology</a>
      <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/09894/bsc-materials-science-and-engineering/#course-profile' target='_blank' rel="noreferrer" >Materials Science and Engineering</a>
      <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/03333/beng-aerospace-engineering/' target='_blank' rel="noreferrer" >Aerospace Engineering</a>
      <a href='https://www.manchester.ac.uk/study/undergraduate/courses/2023/00638/bsc-physics/' target='_blank' rel="noreferrer" >Physics</a>

      <footer className='w-100' style={{paddingTop:"30px", paddingBottom:"50px", borderTop:"solid",marginTop:"20px"}}>
        <p>copyright &#169; 2023 <a href='https://www.linkedin.com/in/alan-prophett/'>Alan Prophett</a></p>
      </footer>
    </div>
  );
}

export default App;
