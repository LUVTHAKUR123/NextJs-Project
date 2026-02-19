import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";
import Order from "@/models/Order";

// DB init inside function (no top-level code)
async function initDB() {
  await sequelize.sync();
}

/**
 * GET /api/order
 */
export async function GET() {
  try {
    await initDB();

    const orders = await Order.findAll();

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

/**
 * POST /api/order
 */
export async function POST(request: Request) {
  try {
    await initDB();

    const body = await request.json();
    const { items, paymentMode, description } = body;

    if (!items || !paymentMode) {
      return NextResponse.json(
        { success: false, message: "items and paymentMode required" },
        { status: 400 },
      );
    }

    const order = await Order.create({
      items,
      paymentMode,
      description,
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
