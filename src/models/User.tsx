import { DataTypes } from "sequelize";
import sequelize from "@/lib/sequelize";

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
