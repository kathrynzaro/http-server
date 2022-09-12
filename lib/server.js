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
        socket.write('You sent' + data.toString().toUpperCase());
      } else {
      }
    });
  });
  server.listen(port, host, () => {
    logOut('My server is up!');
  });
  logOut('Attempting to start server...');
  return server;
};
