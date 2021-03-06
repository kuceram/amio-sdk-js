const debug = require('debug')('amio-sdk-js:request.message')
const Request = require('./request')

class Message extends Request {

  constructor(httpClient) {
    super(httpClient)
  }

  list(channelId, contactId, params = {max: 10, offset: 0}) {
    debug('list() messages for contact', contactId, 'in channel', channelId, 'with params:', params)
    const headers = this._createHeaders(arguments)

    return this.httpClient
      .get(`/v1/channels/${channelId}/contacts/${contactId}/messages`, {
        params,
        headers
      })
      .then(response => ({
        items: response.data,
        totalCount: Number.parseInt(response.headers['x-total-count'])
      }))
  }

  send(message) {
    debug('send() message:', message)
    const headers = this._createHeaders(arguments)
    return this.httpClient
      .post('/v1/messages', message, {headers})
      .then(response => response.data)
  }
}

module.exports = Message
