import React, { Component } from 'react'
import {Grid, ListGroup, ListGroupItem,Button, Glyphicon} from 'react-bootstrap'
import { voteArticle, addArticle } from '../utils/api'
import AddModal from './addArticle'
import uuidv4 from 'uuid/v4'

export default class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state= {
      show: false
    }
  }
  updateVote(id) {
    voteArticle(id).then((article) => {
      this.props.updateVote(article)
    })
  }

  addArticle(value) {
    addArticle({
      id: uuidv4(),
      websiteUrl: value
    }).then((result) => {
      this.props.updateState(result)
      this.hideModal()
    })
  }

  hideModal() {
    this.setState({
      show: false
    })
  }

  formatLinkName(url) {
    let [, name, ...ext] = url.split('.')
    return name[0].toUpperCase() + name.substr(1,name.length-1) + '.' + ext.join('.')
  }

  render() {
    return (
      <Grid>
        <ListGroup>
          {this.props.articles.map((article) => (
            <ListGroupItem key={article.id}><Button bsStyle="primary" onClick= {() =>this.updateVote(article.id)}>Vote</Button><a className="link" href={`http://${article.websiteUrl}`} target="_blank">{this.formatLinkName(article.websiteUrl)}</a> <span className="vote-count">{article.vote} votes</span></ListGroupItem>
          ))}
        </ListGroup>
        <Button
          bsSize="large"
          bsClass="add-button"
          onClick={() => this.setState({ show: true })}
        >
        <Glyphicon glyph="plus" />
        </Button>
        <AddModal showModal={this.state.show} onHide={this.hideModal.bind(this)} addArticle={this.addArticle.bind(this)}/>
      </Grid>
    )
  }
}
