const services = [
  {
    name: 'Posts',
    prefix: 'posts',
    host: '127.0.0.1',
    port: '4567',
    https: false,
  },
  {
    name: 'Tweets',
    prefix: 'tweets',
    host: '127.0.0.1',
    port: '3333',
    https: false,
  },
  {
    name: 'User ACL',
    prefix: 'autenticacao',
    host: '127.0.0.1',
    port: '9999',
    https: false,
  },
]

module.exports = services
