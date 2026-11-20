import LastTweets from "./LastTweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Hashtag.module.css";
import { useEffect, useState } from "react";
import Trends from "./Trends"
import { useSelector } from "react-redux";

function Hashtag() {
const researchedHasttag = useSelector((state) => state.trend.value)

const[hashtag, setHashtag]= useState(researchedHasttag);
const[tweetsData, setTweetsData] = useState([]);

// 1 récupere tous les tweets au chargement de la base de données

useEffect(() => {

    fetch(`http://localhost:3000/trend/hashtag/Klu1LWnJSC-iVMcztCczLApwLxbknIIR/${hashtag}`)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
            console.log('la',data)
            for(let i=0;i<data.trends.length;i++) {
                for(let j=0;j<data.trends[i].tweets.length;j++) {
                     setTweetsData([...tweetsData,data.trends[i].tweets[j]])
                }
            }           
        }
    });
}, [hashtag]);

const lastTweets = tweetsData.map((data, i) => {
    //console.log(tweetsData)
    return(
    <LastTweets 
    key={i}
    message={data.message}
    />)
})
//console.log(lastTweets)
const handleHashtag = (value) => {
    setHashtag(value)
}

  return (
    <div className={styles.mainContainer}>
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
      <div className={styles.homeContainer}>
        <h3>Hashtag</h3>
        <input onChange={(e) => handleHashtag(e.target.value)} value={hashtag}/>
      
        <div className={styles.tweetContainer}>
            {lastTweets}
            </div>
        </div>
      <div className={styles.hashtagContainer}>
        <Trends />
      </div>
    </div>
  );
}

export default Hashtag;
