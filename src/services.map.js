const services = [
  {
    name: 'Users',
    prefix: 'users',
    host: '127.0.0.1',
    port: '3333',
    https: false,
    public: true,
  },
  {
    name: 'Tweets',
    prefix: 'tweets',
    host: '127.0.0.1',
    port: '3333',
    https: false,
  },
  {
    name: 'Authentication',
    prefix: 'auth',
    host: '127.0.0.1',
    port: '3333',
    https: false,
    public: true,    
  }
]

module.exports = services