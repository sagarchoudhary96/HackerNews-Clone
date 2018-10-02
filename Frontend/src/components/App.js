import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'
import MainPage from './MainPage'
import {getAllArticles} from '../utils/api'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }
  addArticle(article) {
    this.setState((state) => ({
      articles: [...state.articles, article]
    }))
  }

  updateVote(article) {
    let {articles} = this.state
    articles.map((elem, index) => {
      if(elem.id === article.id) {
        articles[index].vote = article.vote
      }
    })

    this.setState({
      articles: articles
    })
  }

  componentDidMount() {
    getAllArticles().then((articles) => {
      this.setState({
        articles: articles
      })
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">HackerNews Clone</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <MainPage articles={this.state.articles} updateState={this.addArticle.bind(this)} updateVote={this.updateVote.bind(this)} />
      </div>
    );
  }
}

export default App;
