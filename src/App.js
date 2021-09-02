import './App.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';

class App extends Component {

  state = {
      counter: 0,
      posts: [
        {
          id: 1,
          title: 'Titulo 1',
          body: 'Corpo 1'
        }, 
        {
          id: 2,
          title: 'Titulo 2',
          body: 'Corpo 2'
        }, 
        {
          id: 3,
          title: 'Titulo 3',
          body: 'Corpo 3'
        }
      ]
  };


  componentDidMount () {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postResponse, photoResponse]);
    
    const postsJson = await posts.json();
    const photosJson = await photos.json();
 
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({ posts: postsAndPhotos });  

  }

  componentDidUpdate () {
  }

  componentWillUnmount () {
  }


  render () {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
              <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
