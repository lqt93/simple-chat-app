# SimpleChat App

SimpleChat is a simple chat web application that uses Socket.io and pure [ReactJs](https://reactjs.org/) (without Redux, Saga, etc).
It need the [SimpleChat API](https://github.com/lqt93/simple-chat-api) as its back-end.
The messenger UI is look like Facebook's messenger.

### Download

```sh
git clone https://github.com/lqt93/simple-chat-app.git
```

### Require

SimpleChat requires NodeJs v10.0 and above.

## Installation

\*\* The instruction uses [Yarn](https://yarnpkg.com/en/) as default, you can either use yarn or npm.

```sh
cd simple-chat-app
yarn install
```

### Running

You need to start [SimpleChat API](https://github.com/lqt93/simple-chat-api) first and then you must add its's API_url to process.env.REACT_APP_API_HOST when starting SimpleChat App

```sh
REACT_APP_API_HOST=your_api_url yarn start
```

### License

MIT
