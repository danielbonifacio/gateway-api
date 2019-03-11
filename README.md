![diagram](https://svgur.com/i/B84.svg)

# Gateway API

Free Node.js Gateway API model.

**Before start, make sure you have an `.env` file with an `SECRET` key placed in your project's root.**

``` env
SECRET=YOUR_SECRET_TOKEN
PORT=80
```

## Services Mapping

Basically, to add or remove a service you'll need to change the `services.map.js` file.

It contains an array of *Service Objects*.

There's some props that'll need to pass to the Gateway API, so then it can recognize your service:

``` js
const service = {
  name: 'Posts',
  prefix: 'posts',
  host: '127.0.0.1',
  port: '4567',
  https: false
}
```

- `name` Service's name (Just for debug and log purpose)
- `host` The host that is service running
- `port` The port that is service running
- `prefix` Public service prefix
- `https` Service is running under https? (`boolean`)

### Name

The name of service. It would be used for logs and error handlers.

### Prefix

The public prefix for the service, on gateway.

In Posts service example above, the public URL will be:

``` txt
${api}/posts/some/rest/url
       ^^^^^
```

Note that prefix will not be sent to the service. So, on the previous URL example, the request sent to service will be:

``` txt
${service}/some/rest/url
```

### Host & Port

The service's host and port.

If your service is accessible via `127.0.0.1:3000` the `host` and `port` will be `127.0.0.1` and `3000` respectively.

### HTTPS

Just a boolean for the service protocol, if true, the request will be done over HTTPS protocol. Defaults to false.


## Auth Middleware

By default, all requests needs to pass on the Auth method.

You cannot get out of it. So if you need "token free" public link, make sure you've been added a condition in `middlewares/auth.js`.

If you want to add another middleware, you can do it in `helpers/routerRegister.js` file.

## Packages and Credits

- Daniel Bonifacio [@danielbonifacio](https://github.com/danielbonifacio) - Created the repo and maintain all this code
- Express - Microframework
- Nodemon - Livereload server
- Axios - HTTP request library

If you find a bug or think something could be better, please, [create a issue](https://github.com/danielbonifacio/gateway-api/issues) or a [pull request](https://github.com/danielbonifacio/gateway-api/pulls).
