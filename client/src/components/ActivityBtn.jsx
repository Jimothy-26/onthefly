import { useState } from "react";
import "./ActivityBtn.css";

const ActivityBtn = (props) => {

  const [num_votes, setNumVotes] = useState(props.num_votes);

  // Step 9: Use a PATH request to update the number of votes for the activity in the database
  const updateCount = async () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num_votes: num_votes + 1 }),
    };

    await fetch("/activities/" + props.id, options);
    setNumVotes((num_votes) => num_votes + 1);
    
  };

  return (
    <button className="activityBtn" id={props.id} onClick={updateCount}>
      {props.activity} <br /> {"△ " + num_votes + " Upvotes"}
    </button>
  );
};

export default ActivityBtn;