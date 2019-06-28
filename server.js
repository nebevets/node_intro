const express = require('express');
const path = require('path');

const server = express();

server.use(express.static(path.resolve(__dirname)));

server
  .listen(3001, () => {
    console.log('server listening on port localhost:3001');
  })
  .on('error', (error) => {
    console.log('error listening on localhost:3001. perhaps something is already using that port?')
  })