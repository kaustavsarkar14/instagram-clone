import React,{ useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './firebase'



function App() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  },[])

  return (
    <div className="app">
      <div className="app__header">
        <img className='app__headerImage' src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016-700x199.png" alt="" />
      </div>

      {
        posts.map(post =>(
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
