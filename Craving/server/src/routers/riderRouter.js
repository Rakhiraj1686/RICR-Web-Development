import express from "express"

const router =express.Router();

router.get("/availableOrders",ProcessingInstruction,PartnerProtect,RiderGetAvailableOrder);