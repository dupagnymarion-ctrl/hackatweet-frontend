import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUserCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/LastTweets.module.css"

function LastTweets (props) {

//condition pour l'affichage de la poubelle si utilisateur connecté
let deleteIcon = null;
if (props.token === props.userConnection) {
  deleteIcon = (
<FontAwesomeIcon
          onClick={() => props.deleteTwee()}
          icon={faTrash}
          style={faTrash}
          className={styles.deleteIcon}
        />
  )
}

// pour liker les tweets
const likeTweet = () => {
 props.likeTweet(props.id, props.isLiked);
  };


  let heartIconStyle = { 'cursor': 'pointer' };
  if (props.isLiked) {
    heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }


return (
<div>
<FontAwesomeIcon
          icon={faUserCircle}
          style={faUserCircle}
          className={styles.userIcon}
        />
<h3>{props.username}</h3><span>- 5 hours</span>
<p>{props.message}</p>
<FontAwesomeIcon
          onClick={() => likeTweet()}
          icon={faHeart}
          style={heartIconStyle}
          className={styles.heartIconStyle}
        />
        {deleteIcon}
</div>
)
};

export default LastTweets;