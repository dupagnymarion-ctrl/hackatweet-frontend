import LastTweets from "./LastTweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Tweet.module.css";
import { useEffect, useState } from "react";
import Trends from "./Trends";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { login, logout } from '../reducers/user';
import { newTrigger } from '../reducers/trend';
import { useRouter } from "next/navigation";

function Tweets() {
  const [tweet, setTweet] = useState("");
  const [tweetsData, setTweetsData] = useState([]);
  const [tweetsList, setTweetsList] = useState([]);
  const [newTweet, setNewTweet] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const userConnection = useSelector((state) => state.user.value.token);

  // 1 récupere tous les tweets au chargement de la base de données


  const fetchTweets = () => {
    let lastTweets = null;
 fetch(`https://hackatweet-backend-sand.vercel.app/tweet/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTweetsData(data.tweets);
          
          lastTweets = data.tweets.map((data, i) => {
            //console.log('ici',tweetsData)
            return (
              <LastTweets
                key={i}
                id={data._id}
                message={data.message}
                token={user.token}
                deleteTweet={deleteTweet}
                userConnection={userConnection}
                isLiked={data.isLiked}
                likeTweet={() => likeTweet(data._id, data.isLiked)} 
              />
            );
          });
          setTweetsList(lastTweets);
        }
      });
  }

  useEffect(() => {
   fetchTweets()
  },[newTweet]);

  const postTrend = (id, hashtag) => {
    fetch("https://hackatweet-backend-sand.vercel.app/trend/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        tweet_id: id,
        hashtag
      }),
    })
    dispatch(newTrigger())
  };


  // 2 Envoyer un nouveau tweet vers la base de données

  const postTweet = () => {
    let hashtag = tweet.match(/#\w+/g);

    fetch("https://hackatweet-backend-sand.vercel.app/tweet/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        message: tweet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          if(hashtag.length > 0) {
            postTrend(data.tweets._id,hashtag)
          }
          //console.log(data.tweets._id)
          //setTweetsData([...tweetsData, data.tweets]);
          setTweet("");
          setNewTweet(!newTweet); // état se recharge dès un nouveau tweet
        }
      });
  };

  //Suppression d'un tweet

  const deleteTweet = (tweet_id) => {
    console.log("Token envoyé :", user.token);
    fetch(`https://hackatweet-backend-sand.vercel.app/tweet/${tweet_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userConnection }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetchTweets();
        }
      });
  };
  


  // route Post pour liker les tweets

   const likeTweet = (tweet_id, currentIsLiked) => {
    fetch("https://hackatweet-backend-sand.vercel.app/tweet/like"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        tweet_id: tweet_id,
        isLiked: !currentIsLiked,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      if (data.result) {
        fetchTweets()
         } 
      });
  };
 

  // Logout

  const logoutClick = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.leftContainer}>
        <div>
            <Link href="/tweet">
              <FontAwesomeIcon
                icon={faTwitter}
                style={styles.faTwitter}
                className={styles.twitterIcon}
              />
            </Link>
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
        <input onChange={(e) => setTweet(e.target.value)} value={tweet}/>
        <button className={styles.buttonTweet} onClick={() => postTweet()}>Tweet</button>
        {tweetsList}
      </div>
        
      <div className={styles.hashtagContainer}>
        <Trends />
      </div>
    </div>
  );
}

export default Tweets;
