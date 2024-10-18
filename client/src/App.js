import './App.css';
import { useEffect, useState } from 'react';
import beforeImage from './images/Before.jpeg'
import afterImage from './images/After.jpeg'
import logo from './images/Logo3.png'
import ghLogo from './images/github-mark.png'
import discordLogo from './images/discord-logo.png'
import settingsIcon from './images/settings icon publish.png'
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import NavBar from './components/NavBar'
import CustomizationSection from './components/customization/CustomizationSection';

function App() {
  const [uomAPI, setUomAPI] = useState("");
  const[hiddenManual, setHiddenManual] = useState(true);
  const [newIcsUri, setNewIcsUri] = useState("");
  const [featureCodes, setFeatureCodes] = useState("00-02");


  function getIds(url){
    let parts = url.split('/')
    const letterAndDashRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/i;
    let matches = [];
    for(let i of parts){
      if(letterAndDashRegex.test(i)){
        matches.push(i)
      }
    }
    return matches;
  }

  useEffect(()=>{
    let matches = getIds(uomAPI)
    //console.log(matches)
    setHiddenManual(true);
    setNewIcsUri(`https://tile.alan-p.com/api/v2/${featureCodes}/${matches[0]}/${matches[1]}/tt.ics`);   
  }, [uomAPI,featureCodes])

  const toggleHiddenManual = () => {
    setHiddenManual(!hiddenManual);
  }

  const handleFeatureCodeStateChange = (newState) => {
    setFeatureCodes(newState);
  };

  const testUomApiUrlValid= ()=> {return uomAPI.endsWith('.ics') && getIds(uomAPI).length===2}

  return (
    <div className="App">
      <NavBar/>
      <div className='w-100 bg-danger text-white'>
        <hr/>
        <b>Discontinued 30 Oct 2024 - Thank you for using T-I-L-E!</b>
        <hr/>
        </div>
      <img src={ghLogo} alt='github logo' style={{position:'absolute', top:'100px', right:'10px', margin:'15px', border:'0px', zIndex:'1000', width:'50px', cursor:'alias'}} onClick={(e)=>{window.location="https://github.com/AAP9002/Timetable-ICS-Live-Editor/"}}/>
      <img src={discordLogo} alt='discord logo' style={{position:'absolute', top:'180px', right:'10px', margin:'15px', border:'0px', zIndex:'1000', width:'50px', cursor:'alias'}} onClick={(e)=>{window.location="#social"}}/>
      <img id="logo"src={logo} alt="Timetable ICS Live Editor" className='w-100' style={{maxWidth:'600px',mixBlendMode:'darken'}}/>
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
      <h2 id='stepOne' className='mt-5'>STEP 1: Enter your UoM Timetable ICS Link</h2>
      <ol id='steps' style={{ width: "100vw", maxWidth:"500px", margin: "auto", padding: "0px 0px 40px 0px" }}>
        <li>1 . Visit <a href='https://timetables.manchester.ac.uk/timetables' target='_blank' rel='noreferrer'>https://timetables.manchester.ac.uk/timetables</a></li>
        <li>2 . Sign In</li>
        <li>3 . Click on the <b>Subscribe</b> button <b className='onMobileSteps'>(located in the top right menu <img src={settingsIcon} alt="settings icon"/> )</b></li>
        <li>4 . Click on <b>More</b></li>
        <li>5 . Click on <b>Copy</b></li>
        <li>6 . Paste the Timetable ICS Link into the box below</li>
      </ol>
      <label for="icsBox">UoM Timetable ICS Link:</label>
      <input id="icsBox" type="text" placeholder="Enter UoM ICS Link" onChange={(e)=>{setUomAPI(e.target.value)}} style={{ minWidth: "80%" }} />
      <br />

      <h2 className="mt-5"> STEP 2: Choose features</h2>
      <p>Select your features to customise your experience.</p>
      <CustomizationSection onSetFeatureCodes={handleFeatureCodeStateChange}/>
      <code>Note: You can change the setup at a later time by removing the calender in your app and completing the set up again.</code>    

      <h2 className="mt-5"> STEP 3: Add to calender</h2>
      <code>Use mobile data if you are on university WI-FI</code>
      {testUomApiUrlValid()?<>
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
        <button className="btn btn-link" onClick={toggleHiddenManual}>set up manually</button>
        </>:<p>Please enter a valid UoM Timetable ICS link in step 1</p>}
        
        {hiddenManual?null:<>
      <p>Most calendar apps enable you to subscribe using a URL. Copy the URL below and follow your calendar app's subscription instructions.</p>
      <p style={{ fontWeight: "bold", minWidth: "80%", overflowWrap: "anywhere"}}>{newIcsUri}</p>
      </>}
      <h2 className='mt-5' id="social"> STEP 4: Optional</h2>
      <p>Join our discord, to make suggestions, be alerted of issues, and receive any important announcements.</p>
      <iframe id="discordWidget" title="Discord Widget" src="https://discord.com/widget?id=1177617947188011112&theme=dark" width="350" height="200" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>      <h2 id='contribute' className='mt-5'>Open to contributions</h2>
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
        <p>copyright &#169; 2023-2024 <a href='https://www.linkedin.com/in/alan-prophett/'>Alan Prophett</a></p>
      </footer>
    </div>
  );
}

export default App;
