import React from 'react'
import {Modal, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap'

export default class AddModal extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        value : '',
        showError: false
      }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }
  handleSubmit() {
    if (this.state.value === '') {
      this.setState({
        showError: true
      })
      return false
    }
    this.props.addArticle(this.state.value)
  }

  render () {
    return(
      <Modal show={this.props.showModal} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.state.showError && <Alert bsStyle="danger">Url can't be empty</Alert>}
        <ControlLabel>Website url</ControlLabel>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Enter website url"
          onChange={this.handleChange}
        />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => this.handleSubmit()}>Add</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
