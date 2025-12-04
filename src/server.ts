import app from "./app";
import variables from "./config";

app.listen(variables.port, () => {
  console.log(`Server is listening on port ${variables.port}`);
});
