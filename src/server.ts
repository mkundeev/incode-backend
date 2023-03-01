import app from "./app";
import dbConnection from "./config/database";

app.listen(4000, async () => {
  try {
    await dbConnection();
    console.log("Database connection successful");
    console.log(`Server running. Use our API on port: 4000`);
  } catch (err) {
    process.exit(1);
  }
});
