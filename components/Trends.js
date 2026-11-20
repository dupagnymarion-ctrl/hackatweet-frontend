import styles from "../styles/Trends.module.css";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";

import { research } from '../reducers/trend';

function Trends() {
  const dispatch = useDispatch()
  const router = useRouter();
  const hashtag = useSelector((state) => state.trend.trigger)

  const [trends, setTrends] = useState ([])
 const user = useSelector((state) => state.user.value)
  const handleResearchTrend = (value) => {
    dispatch(research(value))
    router.push("/hashtag");
  }

  useEffect(() => {
    fetch(`https://hackatweet-backend-sand.vercel.app/trend/${user.token}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                //console.log(data)
                const list = data.trends.map ((e) => {
                    return (<div className={styles.tile} >
                        <p className={styles.hashtag} onClick={() => handleResearchTrend(e._id)}>{e._id}</p>
                        <p className={styles.count}>{e.count} tweet{e.count>1&&'s'}</p>
                    </div>)
                })
                setTrends(list)
            }
        });
  },[hashtag])

  return (
    <div>
      <div className={styles.container}>
        <h1>Trends</h1>
      </div>
      <div className={styles.trendsList}>{trends}</div>
    </div>
  );
}

export default Trends;
