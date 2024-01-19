# CodeRunner - Remote Code Executor

CodeRunner is a remote code executor similar to what is used by famous coding platforms. It takes the code and user input and sends the response or the output.

## Project Tech Stack

The frontend uses React.js + Vite and Material-UI for UI components. The backend of this project uses Nginx as a reverse proxy and serves the static files for the frontend. There are different Django servers that compile and run Python, JavaScript, and C++ respectively.

## Clone the Project

Clone the project locally using the link:

```bash
git clone https://github.com/chahatsagarmain/remote-code-executor.git
cd remote-code-executor
```

To run the project locally 

### Build with docker Compose
```bash
    cd server-side
    docker-compose build
```

```bash 
    docker-compose up
```

Now , go to localhost:8000/ to access the application

## Project Structre

#### frontend 
    ./client-side/remote-code-executor-frontend/

### backend 
    Nginx rever proxy 
    ./server-side/nginx-reverse-proxy

    Django server to run C++ code
    ./server-side/cpp-code-executor-server/python_executor

    Django server to run python code 
    ./server-side/python-code-executor/python_executor

    Django server to run javascript code
    ./server-de/javascript-code-executor/

## Pull requests
Contributing and pull requests are welcome for this small project . 
Happy hacking !
