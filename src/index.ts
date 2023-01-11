import database from "./utils/DI";
import runServer from "./utils/server";

const app = runServer(database);
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`poker_be is running on port:${PORT}`);
});
