import { hashPassword } from "@/app/lib/auth";
import { Role } from "@/app/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main (){
    console.log("Starting database seed...")

    // Create teams
const teams = await Promise.all([
  prisma.team.create({
    data: {
      name: "Engineering",
      description: "Software development team",
      code: "ENG-2024",
    },
  }),
  prisma.team.create({
    data: {
      name: "Marketing",
      description: "Marketing and sales team",
      code: "MKT-2024",
    },
  }),
  prisma.team.create({
    data: {
      name: "Analytics",
      description: "Data analytics and reporting team",
      code: "ANL-2024",
    },
  }),
]);


    // Create sample users
    const sampleUsers = [
    {
        name: "John Developer",
        email: "john@company.com",
        team: teams[0], // Engineering
        role: Role.MANAGER,
    },
    {
        name: "Jane Designer",
        email: "jane@company.com",
        team: teams[0], // Engineering
        role: Role.USER,
    },
    {
        name: "Mike Marketer",
        email: "mike@company.com",
        team: teams[1], // Marketing
        role: Role.MANAGER,
    },
    {
        name: "Sara Analyst",
        email: "sara@company.com",
        team: teams[2], // Analytics
        role: Role.MANAGER,
    },
    {
        name: "Alex Data",
        email: "alex@company.com",
        team: teams[2], // Analytics
        role: Role.USER,
    },
    ];

    for (const userData of sampleUsers){
        await prisma.user.create({
            data:{
                email:userData.email,
                name:userData.name,
                password: await hashPassword("123456"),
                role:userData.role,
                teamId: userData.team.id
            }
        })
    }
    console.log("Database seeded successfully")
        
}
main().catch((e) =>{
    console.error("Seeding failed",e)
    process.exit(1);

}).finally(async ()=>{
    await prisma.$disconnect()
})