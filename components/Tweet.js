import { useSelector } from "react-redux";
import LastTweets from "./LastTweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Tweet.module.css";
import { useEffect, useState } from "react";
import Trends from "./Trends";

function Tweets() {
  const user = useSelector((state) => state.user.value);
  const [tweet, setTweet] = useState("");
  const [tweetsData, setTweetsData] = useState([]);
  const [newTweet, setNewTweet] = useState(false);

  // 1 récupere tous les tweets au chargement de la base de données

  useEffect(() => {
    if (!user.token) {
      return;
    }

    fetch("http://localhost:3000/tweet", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTweetsData(data.tweets);
        }
      })
      .catch((error) => {
        console.error("Erreur de chargement des tweets :", error);
      });
  }, [newTweet, user.token]);

  // 2 Envoyer un nouveau tweet vers la base de données

  const postTweet = () => {
    fetch("http://localhost:3000/tweet/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: "YjPL-MJi1S2HRSliTfuFeWPQJH9_KwT0",
        message: tweet,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          setTweetsData([data.tweets, ...tweetsData]);
          setTweet("");
          setNewTweet(!newTweet);
        }
      });
  };

  //Suppression d'un tweet

  const deleteTweet = (tweet_id) => {
    fetch(`http://localhost:3000/tweet/{tweet_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "YjPL-MJi1S2HRSliTfuFeWPQJH9_KwT0" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTweetsData(tweetsData.filter((t) => t._id !== tweet_id));
        }
      });
  };

  const lastTweets = tweetsData.map((data, i) => {
    <LastTweets
      key={i}
      id={data._id}
      texte={data.message}
      token={data.user.token}
      delete={deleteTweet}
    />;
  });

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.leftContainer}>
        <div>
          <FontAwesomeIcon
            icon={faTwitter}
            style={styles.faTwitter}
            className={styles.twitterIcon}
          />
          <button>Logout</button>
        </div>
      </div>
      <div>
        <div className={styles.homeContainer}>
          <h3>Home</h3>
          <input onChange={(e) => setTweet(e.target.value)} value={tweet} />
          <button className={styles.buttonTweet} onClick={postTweet}>
            Tweet
          </button>
        </div>
        {lastTweets}
      </div>
      <div className={styles.hashtagContainer}>
        <Trends />
      </div>
    </div>
  );
}

export default Tweets;
