# React Web Client Boilerplate


A React.js Web Client Boilerplate


* Author(s): John Connor Sanders
* Current Version: 0.0.1
* Release Date: 9/06/2019
* MIT License
___
## Getting Started

The react_web_boilerplate is built to run in tangent with the restful_api_boilerplate.

The API can be found here:

https://github.com/JECSand/restful_api_boilerplate

### Prerequisites

* An Ubuntu 18+ Operating System
* A Restful API Boilerplate Configured & Deployed

### Setup

1. Clone the git repo:
```
$ git clone https://github.com/JECSand/react_web_boilerplate
$ cd react_web_boilerplate
```

2. Install NodeJS & NPM:
```
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt install nodejs
$ sudo apt install npm
```

3. Configure App's local webpack settings:
```
$ cp webpack.config.js.example webpack.config.js
$ vi webpack.config.js
Locate the 'apiUrl' setting towards the bottom of the page and replace the value with your backend API's url.
```

4. Install Webpack using npm:
```
$ cd react_boilerplate/
$ sudo npm install
```

5. Run dev server:
```
$ npm start
```

6. Open a web browser and go to http://0.0.0.0:8080 to view the App.