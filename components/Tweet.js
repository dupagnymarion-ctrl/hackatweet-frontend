import LastTweets from "./LastTweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Tweet.module.css";
import { useState } from "react";

function Tweets() {
const[tweet, setTweet]= useState('')

const postTweet = () => {
fetch('http://localhost:3000/tweet/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token:"YjPL-MJi1S2HRSliTfuFeWPQJH9_KwT0", message: tweet }),
		}).then(response => response.json())
			.then(data => {
                console.log(data)
                setTweet('');

})
} 

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.leftContainer}>
        <div>
          <FontAwesomeIcon
            icon={faTwitter}
            style={styles.faTwitter}
            className={styles.twitterIcon}
          />
          <button >Logout</button>
        </div>
      </div>
      <div>
      <div className={styles.homeContainer}>
        <h3>Home</h3>
        <input onChange={(e) => setTweet(e.target.value)} value={tweet}/>
        <button className={styles.buttonTweet} onClick={postTweet}>Tweet</button>
      </div>
        <LastTweets />
        </div>
      <div className={styles.hashtagContainer}>
        <h3>Trends</h3>
        <p>Liste Hashtag Components</p>
      </div>
    </div>
  );
}

export default Tweets;
