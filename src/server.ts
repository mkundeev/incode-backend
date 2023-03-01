import app from "./app";
import dbConnection from "./config/database";

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log("Database connection successful");
    console.log(`Server running. Use our API on port: ${PORT}`);
  } catch (err) {
    process.exit(1);
  }
});
