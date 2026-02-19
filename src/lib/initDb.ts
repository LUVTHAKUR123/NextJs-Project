import sequelize from "./sequelize";
import { testDBConnection } from "./sequelize";

export async function initDB() {
  try {
    console.log("⏳ Checking database connection...");
    await testDBConnection();

    console.log("⏳ Syncing database models...");
    await sequelize.sync({ alter: true });

    console.log("✅ All models synced successfully");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
}
