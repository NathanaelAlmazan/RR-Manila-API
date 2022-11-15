import { AccreditedBank, RevenueDistrictOffice } from "@prisma/client";
import prismaClient from "../prisma-client";

export const getRevenueDistrictOffices = async () => {
    return await prismaClient.revenueDistrictOffice.findMany();
}

export const getBankDistrictOffice = async (parent: AccreditedBank) => {
    return await prismaClient.revenueDistrictOffice.findUnique({
        where: {
            rdo_no: parent.rdo_no
        }
    })
}