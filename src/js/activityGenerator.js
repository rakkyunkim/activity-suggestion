
import '../css/activityGenerator.css';
import {useState} from 'react';
import axios from 'axios';
import DisplayActivities from './displayActivities';
import LoadingScreen from './loadingScreen';

function ActivityGenerator() {
    const [showResult, setShowResult] = useState(true);
    const [clickedYes, setClickedYes] = useState(false);
    const [clickedNo, setClickedNo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [numParticipants, setNumParticipants] = useState(0);

    const [activity, setActivity] = useState("");

    
  function handleYes(numPeople){
    let url = numPeople === 0 ? "https://www.boredapi.com/api/activity" : `https://www.boredapi.com/api/activity?participants=${numPeople}`;
        console.log("loading..");
        setLoading(true);
        setShowResult(false);
        axios.get(url)
        .then((response) => {
            setActivity(response);
            setClickedYes(true);
            setClickedNo(false);
            setShowResult(false);
            setLoading(false);
            console.log("done.");
        })
        .catch((e) => {
            console.log("Failed to get activities", e);
            setLoading(false);
        });
        
    }
    function handleNo(){
        setClickedNo(true);
        setClickedYes(false);
        setShowResult(false);
    }
    function handleGoBack(){
        setClickedYes(false);
        setClickedNo(false);
        setShowResult(true);
    }

    function handleSubmit(e){
        e.preventDefault(); 
        let numP = parseInt(e.target[0].value);
        if(!Number.isInteger(numP)){
            alert("Enter a number");
        }
        else if(numP > 5){
            alert("We only support 1 to 5 participants")
        }
        else{
            handleYes(numP);
        }
    }
    return (
        showResult ? 
        <div className="wrapper-form">
            <h1>Are you bored?</h1>
            <div className='choice-buttons'>
                <button onClick={() => handleYes(0)}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>
        : clickedYes ?
        loading ? 
            <LoadingScreen/>
        : 
        <div className="activities-div">
            <h2>Activity Suggestion: </h2>
            <DisplayActivities myActivity={activity}/>
            <form onSubmit={handleSubmit}>
                <div className="num-participants-form">
                    <p><strong>Adjust # of participants:</strong> </p>
                    <input onChange = {(e) => setNumParticipants(e.target.value)} value={numParticipants}></input>
                </div>
                <div className="buttons">
                    <button className="go-back-bttn" type="submit">Another One</button>
                    <button className="go-back-bttn" onClick={handleGoBack}>Go back</button>
                </div>
            </form>
        </div>
        : clickedNo ? 
        <div className="choice-no-div">
            <h1>Nice</h1>
            <button className="go-back-bttn" onClick={handleGoBack}>Go back</button>
        </div>
        :
        <div>
        </div>
        
    );
}

export default ActivityGenerator;