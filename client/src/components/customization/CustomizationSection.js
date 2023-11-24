import './customizationSectionStyle.css'
import { useEffect, useState } from 'react';

const CustomizationSection = ({onSetFeatureCodes}) => {
  const [resultingConfig,setResultingConfig] = useState("00-02");


  // replace course code with name
  const [code00state, setCode00state] = useState(true);
  // keep the course code when replacing course code with name
  const [code01state, setCode01state] = useState(false);
  // Forced update -- once a day (keep true)
  //const [code02state, setCode02state] = useState(true); (always added to a state is not needed)
  // add check in link for international students
  const [code03state, setCode03state] = useState(false);

  useEffect(()=>{
    let codeParts = []

    // keep the course code when replacing course code with name
    if(code00state && code01state){
      codeParts.push("01")
    }

    // replace course code with name
    if(code00state && !code01state){
      codeParts.push("00")
    }

    // add check in link for international students
    if(code03state){
      codeParts.push("03")
    }

    // Forced update -- once a day (keep true)
    codeParts.push("02")

    setResultingConfig(codeParts.join('-'))
    onSetFeatureCodes(codeParts.join('-'))
    console.log(resultingConfig)
  }, [code00state, code01state, code03state, onSetFeatureCodes, resultingConfig])



  return (
    <>
      <table>
        <tr>
          <td width="40px" onClick={(e)=>{alert("Add course names to event titles:\nReplaces the course code in the calender with the course name, making it easier to plan your day.")}}>
            ℹ️
          </td>
          <td>
            Add course names to event titles
          </td>
          <td width="40px">
            <div class="toggle-container">
              <input type="checkbox" class="toggle-input" id="00" checked={code00state} onChange={()=>{setCode00state(!code00state);}} />
              <label class="toggle-track" for="00">
                <div class="toggle-thumb"></div>
              </label>
            </div>
          </td>
        </tr>
        <tr style={code00state?{visibility:'visible', maxHeight:'fit-content'}:{visibility:'hidden', maxHeight:"0px"}}>
          <td width="40px" onClick={(e)=>{alert("Add course codes in event titles:\nKeeps both the course name and code in the title, to have the best of both worlds.")}}>
            ℹ️
          </td>
          <td>
            Add course codes to event titles
          </td>
          <td width="40px">
            <div class="toggle-container">
              <input type="checkbox" class="toggle-input" id="01" checked={code01state} onChange={()=>{setCode01state(!code01state);}}/>
              <label class="toggle-track" for="01">
                <div class="toggle-thumb"></div>
              </label>
            </div>
          </td>
        </tr>

        <tr>
          <td width="40px" onClick={(e)=>{alert("Add 'check in' link to description:\nFor international students, a quick and easy way to check in to lectures.")}}>
            ℹ️
          </td>
          <td>
            International Students: Add 'check in' link to description
          </td>
          <td width="40px">
            <div class="toggle-container">
              <input type="checkbox" class="toggle-input" id="03" checked={code03state} onChange={()=>{setCode03state(!code03state);}}/>
              <label class="toggle-track" for="03">
                <div class="toggle-thumb"></div>
              </label>
            </div>
          </td>
        </tr>
      </table>
      {/* <p>RAW CONFIG: {resultingConfig}</p> */}
    </>
  );
}

export default CustomizationSection;