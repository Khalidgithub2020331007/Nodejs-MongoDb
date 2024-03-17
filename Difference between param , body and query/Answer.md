In Express.js, req.params, req.body, and req.query are all properties of the request object (req) provided by Express. They are used to access different parts of an incoming HTTP request, each serving a different purpose:

    req.params:
        req.params is an object containing properties mapped to the named route parameters.
        Route parameters are placeholders in the route pattern defined by colon (:) followed by a parameter name in the route path.
        These parameters capture values specified at the corresponding positions in the URL path.
        For example, for the route /users/:userId, if the URL is /users/123, req.params.userId would be "123".

    req.body:
        req.body is an object containing key-value pairs of data submitted in the request body.
        It is commonly used when data needs to be sent to the server, such as form submissions or JSON payloads in POST or PUT requests.
        However, to access req.body, you need to use middleware like body-parser or express.json() to parse the body of the incoming request. This middleware is necessary to populate req.body with the submitted data.

    req.query:
        req.query is an object containing key-value pairs of the query parameters in the URL.
        Query parameters are appended to the URL after a question mark (?) and separated by ampersands (&).
        They are commonly used to provide additional data to a server for filtering, sorting, or pagination purposes.
        For example, in the URL /users?name=John&age=30, req.query.name would be "John" and req.query.age would be "30".

Here's a summary of the differences:

    req.params is used to access named route parameters in the URL path.
    req.body is used to access data submitted in the request body, typically in POST or PUT requests.
    req.query is used to access query parameters in the URL, typically in GET requests.

These properties allow you to access different parts of the request data, depending on how the client is sending the information to the server.
