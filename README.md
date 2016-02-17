# Messaging Service
The goal of this challenge is to make a messaging service in which a client can send and receive live messages.
You can use any possible framework for this as long as the tests will pass.

## Information

- [chat.js](./wwwroot/chat.js)
    - This script creates the page layout as well as the client.
    - It is adviced to take a good look at this page to see how the HTML is generated.
- [client.js][1]
    - This script contain the code that creates a client.
    - The `receive`, `send` and the `connect` function should not be removed and only their content should be modified.
    - You are free to add extra functionality in this file.
- [chat.css][4]
    - This is the main stylesheet for this challange.
    - You are free to add/remove things in this file.
- [index.html][3]
    - This is the main page that should be displayed to the user when visiting.
    - The url should be the same as in [endpoint.json][2]
- [endpoint.json][2]
    - This the settings file containing the url your app should listen on.
    - You are free host this outside this application, but you should alway provide the source code of your application.
- [app.js](./app.js)
    - The main NodeJS entry point of your application, this file will be run when starting tests.
    - Please place your code within the `start` function.
    
Please make sure you application will be hosted on the url provided in [endpoint.json][2]. 

While it is not required to host your code locally, it will be your own responsibility to get the test running correctly.

## Getting Started
The first thing we should done, is running/hosting our [index.html][3] so that the tests can access it.

Thus index [index.html][3] must be available on the url provided in [endpoint.json][2].

## Displaying Messages
After running our server, the `receive` function in [client.js][1] must be fixed, so it will display a message on the page.

For this purpose inside the client object we provided the following `this.$msgField`, which can be used inside `receive`, `send` and the `connect` functions in [client.js][1].

`this.$msgField` is a jQuery object refering to the field in which the messages should be displayed. (displaying messages outside this field will cause the tests to fail). Advanced users can change this object if prefered.

When done correctly, the `must have working receive` test will succeed.

## Adding Login
The next thing we have to do is to add a working login system to the application.

For more information about the login system, read [Login.md](./Login.md).

## Sending Messages
Another part that is important, is the ability to receive message on a second client, the simplest way of creating a new client is to open a second tab in your browser.

The goal to send a message from one client to the other by using a server, the common solution for this problem is to use websockets.

When a message is received succesfully, the `must receive message` test should succeed.

Please use the `receive` function in [client.js][1] to receive any of your messages, else the tests might not succeed.

## Advanced: Customizing
_There are **no** tests for the following_

- By changing [index.html][3] and [chat.css][4], create a custom layout of which you think an application like this should look like.
- Improve the security of the application against things such a [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29).

[1]: ./wwwroot/client.js
[2]: ./endpoint.json
[3]: ./wwwroot/index.html
[4]: ./wwwroot/chat.css
