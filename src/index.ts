import { AppDataSource } from './infrastructure/data-source';
import { Server as HTTPServer } from './entrypoint/rest/server';

// const bodyParser = require("body-parser"); // body parser is no longer needed as long it's already provided out-of-box with express :)

// const app = express()
// app.use(express.json());
// const port = 3000

(async () => {
  const dataSource = await AppDataSource.initialize()
  const server = new HTTPServer()
  server.boot(dataSource)
})()

