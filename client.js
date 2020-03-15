const rrweb = require('rrweb')
import 'rrweb/dist/rrweb.min.css'

let events = []

Meteor.startup(() => {
  console.log('startup')
  rrweb.record({
    emit(event) {
      events.push(event)
    }
  })
  // save events every 10 seconds
  setInterval(save, 10 * 1000)
})

// this function will send events to the backend and reset the events array
function save() {
  // if (!Meteor.user()) {
  //   return
  // }
  const eventsToSend = events
  events = []
  Meteor.call('meteor-rrweb:save', eventsToSend)
}

import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import rrwebPlayer from 'rrweb-player'

const { Mongo } = require('meteor/mongo')
const rrwebSessions = new Mongo.Collection('rrwebSessions')

const Record = () => (
  <div>
    <h1>Hello world</h1>
    <form>
      <input type="text"></input>
    </form>
  </div>
)

const Playback = () => {
  const playbackRef = useRef()
  useEffect(() => {
    Meteor.subscribe('meteor-rrweb:sessions', () => {
      const session = rrwebSessions.findOne({ sessionId: 'Q4kNKSgYpCdviYspp' })
      console.log(session.events)
      new rrwebPlayer({
        target: playbackRef.current, // customizable root element
        data: {
          events: session.events,
          autoPlay: true
        }
      })
    })
  })
  return (
    <div>
      <h2>Playback</h2>
      <div ref={playbackRef} id="rrweb-playback" />
    </div>
  )
}

const App = () => (
  <Router>
    <ul>
      <li>
        <Link to="/record">Record</Link>
      </li>
      <li>
        <Link to="/playback">Playback</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/playback">
        <Playback />
      </Route>
      <Route path="/record">
        <Record />
      </Route>
    </Switch>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('root'))
})
