import React from 'react';
import { Title, Label, Field, List } from './styles'

class App extends React.Component {

  state = {
    personal: [],
    work: [],
    project: '',
    task: '',
    hours: '',
    pTotal: 0,
    wTotal: 0,
    count: 0
  }

  updateProject = event => {
    this.setState({project: event.target.value})
  }

  updateTask = event => {
    this.setState({task: event.target.value})
  }

  updateHours = event => {
    this.setState({hours: event.target.value})
  }

  addItem = () => {
    let state
    switch (this.state.project) {
      case 'personal':
        state = {personal: this.state.personal}
        state.personal.push({
          task: this.state.task,
          hours: this.state.hours,
          id: this.state.count
        })
        state.pTotal = this.state.pTotal + parseInt(this.state.hours, 10)
        break
      case 'work':
        state = {work: this.state.work}
        state.work.push({
          task: this.state.task,
          hours: this.state.hours,
          id: this.state.count
        })
        state.wTotal = this.state.wTotal + parseInt(this.state.hours, 10)
        break
      default: break
    }
    state.task = ''
    state.hours = ''
    state.count = this.state.count + 1
    this.setState(state)
  }

  render() {

    let invalid
    this.state.task.length < 4
    || this.state.hours === ''
    || this.state.project === ''
    ? invalid = true : invalid = false

    return (
    <div>

      <Title>My Project Log</Title>

      <Label field="List">
        <Field tag="select"
          value={this.state.project}
          onChange={this.updateProject}>
          <option value="">(Select a list)</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </Field>
      </Label>

      <Label field="Description">
        <Field tag="input" autoFocus
          maxLength="18"
          value={this.state.task}
          onChange={this.updateTask}>
        </Field>
      </Label>

      <Label field="Hours">
        <Field tag="input"
          sm="true" type="number" min="1"
          value={this.state.hours}
          onChange={this.updateHours}>
        </Field>
      </Label>

      {invalid
      ? <Field tag="button" btn="true" sm="true" disabled
        style={{
          marginLeft: 160,
          backgroundColor: 'gray',
          border: '2px solid gray'
        }}>Add to List</Field>
      : <Field tag="button" btn="true" sm="true"
        style={{marginLeft: 160}} onClick={this.addItem}
        >Add to List</Field>
      }

      <hr style={{border: '1px solid darkred', margin: 25}}/>

      <div style={{display: 'flex'}}>
        <List category="Personal"
          time={this.state.pTotal}
          list={this.state.personal}>
        </List>
        <List category="Work"
          time={this.state.wTotal}
          list={this.state.work}>
        </List>
      </div>
      
    </div>
    )
  }
  
}

export default App;
