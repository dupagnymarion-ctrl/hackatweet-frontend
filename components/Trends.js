import styles from '../styles/Trends.module.css';

import { useState, useEffect } from 'react';

function Trends() {

  const [trends, setTrends] = useState ([])

  useEffect(() => {
    fetch(`http://localhost:3000/trend/Klu1LWnJSC-iVMcztCczLApwLxbknIIR`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log(data)
                const list = data.trends.map ((e) => {
                    return (<div className={styles.tile} >
                        <p className={styles.hashtag}>#{e._id}</p>
                        <p className={styles.count}>{e.count} tweet{e.count>1&&'s'}</p>
                    </div>)
                })
                setTrends(list)
            }
        });
  },[])

  return (
    <div>
     <div className={styles.container}>
        <h1>Trends</h1></div>
        <div className={styles.trendsList}>
        {trends}
        </div>
    </div>
  );
}

export default Trends
;