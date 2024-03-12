import { PrismaClient } from '@prisma/client'

const connectToPrismaDB = () => {
    try {
        const prisma = new PrismaClient()
        console.log(prisma.$connect)
        return prisma
    } catch (error) {
        console.log("Error connecting to Prisma", error)
    }
}

export default connectToPrismaDB