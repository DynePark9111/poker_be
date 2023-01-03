import database from "./utils/DI";
import runServer from "./utils/server";

const app = runServer(database);
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
