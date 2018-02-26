import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Button, PageHeader, FormGroup, FormControl, form } from 'react-bootstrap'


const Menu = () => {
  const style = {
    backgroundColor: 'lightblue',
    margin: 20,
    paddingTop: 50,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 80,
    fontWeight: 'bold'
  }
  const activeStyle = {
      fontWeight: 'bold',
      color: 'red'
  }
  return (
  <div style = {style}>
    <NavLink exact to="/" activeStyle = {activeStyle}>Anecdotes</NavLink> &nbsp;
    <NavLink exact to="/create" activeStyle = {activeStyle}>Create New</NavLink> &nbsp;
    <NavLink exact to="/about" activeStyle = {activeStyle}>About</NavLink>
  </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
      </ListGroup> 
  </div>
)

const Anecdote = ({anecdote}) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      and for more info see <a href={anecdote.info}>{anecdote.info}</a>.
    </p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
  <Row className="show-grid">
    <Col xs={12} md={8}>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Col>
    <Col xs={6} md={4}>
    <img style={{height: 400, width: 500}} src="http://www.azquotes.com/picture-quotes/quote-my-name-is-linus-and-i-am-your-god-linus-torvalds-29-60-84.jpg" alt="My name is Linus, and I am your God. - Linus Torvalds"></img>
    </Col>
  </Row>
  </Grid>
</div>
    
)


const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.addNotification('A new anecdote ' + this.state.content + ' created!')
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div>
          Content
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            Author
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            Url for more info
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <Button bsStyle="success" type="submit">create</Button>
        </FormGroup>
        </form>
        </div>
    )

  }
}

class Notification extends React.Component {
   
  render() {
    let message = this.props.message
    const style = {
      border: 'solid',
      borderColor: 'red',
      backgroundColor: 'lightgreen',
      padding: 10,
      borderWidth: 3,
      borderRadius: 30,
      color: 'navy',
      textAlign: 'center'
    }
    if(message === '') {
      return <div>
      </div>
    }
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  addNotification = (message) => {
    this.setState({notification: message})
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
          <Menu />
        <PageHeader>Software anecdotes</PageHeader>
          <Notification message = {this.state.notification}/>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
          <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew} addNotification = {this.addNotification}/>} />
          <Route path="/about" render={() => <About />} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
