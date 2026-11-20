import LastTweets from "./LastTweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Tweet.module.css";
import { useEffect, useState } from "react";
import Trends from "./Trends"
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login, logout } from '../reducers/user';

function Hashtag() {
const dispatch= useDispatch()
const researchedHasttag = useSelector((state) => state.trend.value)
const user = useSelector((state) => state.user.value)

const[hashtag, setHashtag]= useState(researchedHasttag);
const[tweetsData, setTweetsData] = useState([]);
const router = useRouter();

// 1 récupere tous les tweets au chargement de la base de données

useEffect(() => {

    fetch(`http://localhost:3000/trend/hashtag/${user.token}/${encodeURIComponent(hashtag)}`)
    .then(response => response.json())
    .then(data => {
        if(data.result) {
            console.log('la',data)
            for(let i=0;i<data.trends.length;i++) {
                for(let j=0;j<data.trends[i].tweets.length;j++) {
                    if(data.trends.length>0)
                      setTweetsData([...tweetsData,data.trends[i].tweets[j]])
                }
            }           
        }
    });
}, [hashtag]);

const lastTweets = tweetsData.map((data, i) => {
    console.log(tweetsData)
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

const returnTweet = () => {
    router.push("/tweet");
}

const logoutClick = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.leftContainer}>
        <div><FontAwesomeIcon
                icon={faTwitter}
                style={styles.faTwitter}
                className={styles.twitterIcon}
              onClick={() => returnTweet()}/>
          </div>
          <div className={styles.bottomPage}>
            <div>
              <p className={styles.firstname}>{user.firstname}</p>
              <span className={styles.userTag}>@{user.username}</span>
            </div>
            <button onClick={logoutClick}>Logout</button>
          </div>
      </div>
      <div className={styles.homeContainer}>
        <h3>Home</h3>
        <input onChange={(e) => handleHashtag(e.target.value)} value={hashtag}/>

        {/*lastTweets*/}
      </div>
        
      <div className={styles.hashtagContainer}>
        <Trends />
      </div>
    </div>
  );
}

export default Hashtag;
