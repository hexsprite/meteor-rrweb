const { Meteor } = require('meteor/meteor')
const { Mongo } = require('meteor/mongo')
const { check } = require('meteor/check')

const rrwebSessions = new Mongo.Collection('rrwebSessions')

Meteor.methods({
  'meteor-rrweb:save'(events) {
    check(events, Array)
    // const userId = this.userId
    // if (!userId) {
    //   return
    // }
    const sessionId = this.connection.id
    rrwebSessions.upsert(
      { sessionId },
      {
        $setOnInsert: {
          createdAt: new Date(),
          sessionId
        },
        $push: { events: { $each: events } },
        $set: { updatedAt: new Date() }
      }
    )
  }
})

Meteor.publish('meteor-rrweb:sessions', () => {
  return rrwebSessions.find()
})
