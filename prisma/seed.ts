import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminEmail = "admin@gelojamp.com";
  const adminPassword = "admin123";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("Admin user created:", adminEmail);
  } else {
    console.log("Admin user already exists.");
  }

  const defaultSettings = [
    { key: "company_name", value: "Gelo Jamp" },
    { key: "company_city", value: "Jampruca - MG" },
    { key: "company_whatsapp", value: "+55 33 98704-6287" },
    { key: "whatsapp_link", value: "https://wa.me/5533987046287" },
    { key: "instagram_url", value: "https://www.instagram.com/gelo.jamp/" },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("Default settings created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });