import '../css/displayActivities.css';
function DisplayActivities(props){
    const {myActivity} = props;

    if(myActivity != null){
        return (
            <div className="wrapper-div">
                <p><strong>Activity:</strong> {myActivity.data.activity}</p>
                <p><strong># people: </strong> {myActivity.data.participants}</p>
                <p><strong>Type:</strong> {myActivity.data.type}</p>
            </div>
        )
    }
}

export default DisplayActivities;