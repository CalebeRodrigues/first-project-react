import './App.css';
import { Component } from 'react';
import { loadPosts } from './utils/loadPosts';
import { Posts } from './components/Posts';

class App extends Component {

  state = {
      counter: 0,
      posts: []
  };


  async componentDidMount () {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();

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
        <Posts posts={posts} />
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
