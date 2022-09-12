import chalk from 'chalk';
import net from 'net';

const logOut = (...args) => console.log(chalk.magenta('[server]'), ...args);

export const serve = (host, port) => {
  const server = net.createServer((socket) => {
    logOut('A peer connected!');
    socket.on('data', (data) => {
      const dataStr = data.toString();
      logOut('Got data:', dataStr);
      const lines = dataStr.split('/n');
      const startLine = lines[0];
      const [method, path] = startLine.split(' ');
      if (method === 'GET' && path === '/') {
        const body = `<html>
        <main>
          <h1>help pls</h1>
        </main>
        </html>`;
        const getRequest = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html

${body}`;
        socket.write(getRequest);
      } else if (method === 'GET' && path === '/posts') {
        const json = `[
  {
    "id": "1",
    "sign": "cancer"
  },
  {
    "id": "2",
    "sign": "libra"
  },
  {
    "id": "3",
    "sign": "scorpio"
  }
]`;
        const getJSON = `HTTP/1.1 200 Ok
Content-Length: ${json.length}
Content-Type: application/json

${json}`;
        socket.write(getJSON);
      } else if (method === 'POST' && path === '/mail') {
        const postMail = `HTTP/1.1 204 No Content
Content-Length: 0
Content-Type: application/json
Host: http://localhost:8080/mail

`;
        console.log(postMail);
        socket.write(postMail);
      } else {
        socket.write('You sent' + data.toString().toUpperCase());
      }
    });
  });
  server.listen(port, host, () => {
    logOut('My server is up!');
  });
  logOut('Attempting to start server...');
  return server;
};
