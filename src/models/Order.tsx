import { DataTypes } from "sequelize";
import sequelize from "@/lib/sequelize";
const Order = sequelize.define("Order", {
  items: {
    type: DataTypes.JSON, // array or object store karne ke liye
    allowNull: false,
  },
  paymentMode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

export default Order;
