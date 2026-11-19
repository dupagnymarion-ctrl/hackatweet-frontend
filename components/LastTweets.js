import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/LastTweets.module.css"

function LastTweets (props) {
/*
 if (props.user.token !== )  {

 } 
*/
return (
<div>
<FontAwesomeIcon
          onClick={() => handleHiddenClick()}
          icon={faUserCircle}
          style={faUserCircle}
          className={styles.userIcon}
        />
<h3>{props.username}</h3><span>- 5 hours</span>
<p>{props.message}</p>
<FontAwesomeIcon
          onClick={() => handleLikeClick()}
          icon={faHeart}
          style={faHeart}
          className={styles.heartIcon}
        />
</div>
)
};

export default LastTweets;