import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, context: {params:Promise<{userId:string}>}){

    try {
        const {userId} = await context.params;
        const currentUser = await getCurrentUser();
        if (!currentUser || !checkUserPermission(currentUser,Role.ADMIN)){
            return NextResponse.json({
                error:"You are not authorized to assign team"
            },{status:401})
        }

        //prevent users changing their role 
        if (userId === currentUser.id){
             return NextResponse.json({
                error:"You arecannot change your own role"
            },{status:401})
        }

        //validate role
        const validateRoles = [Role.USER,Role.MANAGER]
        

        const {role} = await request.json()

        if (!validateRoles.includes(role)){
                   const team = await prisma.team.findUnique({where:{id:userId}})
                   if (!team){
                       return NextResponse.json({
                       error: "Invalid role"
                   },{status:400})
                   }
                   
                }

               //update user's team assignment
               const updatedUser = await prisma.user.update({
                where:{id:userId},
                data:{
                    role:role
                },include:{
                    team:true
                }
               })

               return NextResponse.json({
                user: updatedUser,
                message: `user role updated to ${role} successfully`
               })
        
    } catch (error) {
        console.log("Role assignment error")
        if (error instanceof Error && error.message.includes("Record to update not found") ){
            
                       return NextResponse.json({
                       error: "User not found"
                   },{status:404})
                  
        }
        return NextResponse.json({
                       error: "Intrnal server found, something went wrong"
                   },{status:500})
    }

}