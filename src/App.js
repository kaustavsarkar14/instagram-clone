import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase'
import Modal from '@mui/material/Modal';
import { Button, Input } from '@material-ui/core';
import Box from '@mui/material/Box';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in
        console.log(authUser);
        setUser(authUser);


      }
      else {
        //logged out
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }

  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
      setOpen(false);
  }

  const singIn = (event)=>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));
    setOpenSignIn(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <center className='signUp'>
              <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" style={{ height: '2rem' }} alt="" />
              <Input
                type="text"
                value={username}
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="text"
                value={email}
                placeholder='e-mail id'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                value={password}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={signUp} >Sign Up</Button>
            </center>
          </div>
        </Box>
      </Modal>


      {/* sign in  */}


      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <center className='signUp'>
              <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" style={{ height: '2rem' }} alt="" />

              <Input
                type="text"
                value={email}
                placeholder='e-mail id'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                value={password}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' onClick={singIn} >Sign In</Button>
            </center>
          </div>
        </Box>
      </Modal>

      <div className="app__header">
        <img className='app__headerImage' src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016-700x199.png" alt="" />
      </div>

      {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>)
        :
        <div className="app__loginContainer">
          <Button onClick={() => { setOpenSignIn(true) }}>Sign In</Button>
          <Button onClick={() => { setOpen(true) }}>Sign Up</Button>
        </div>
      }

      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;
