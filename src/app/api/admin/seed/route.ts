import { seedDatabase } from "@/backend/prisma/seed";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await seedDatabase();
    return NextResponse.json({ message: "Database seeded" }, { status: 200 });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
};
