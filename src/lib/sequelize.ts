import { Sequelize } from "sequelize";
import pg from "pg"; // PostgreSQL driver

const sequelize = new Sequelize("tricity", "postgres", "526452", {
  host: "localhost",
  dialect: "postgres",
  dialectModule: pg, // ✅ pass the imported pg module
  logging: false, // optional: hides SQL logs
});

// 🔍 Function to test DB connection
export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

export default sequelize;
