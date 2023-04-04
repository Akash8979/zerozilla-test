const agency = require('../models/Agency');
const client = require('../models/Client');
const AgencyService = require("../services/AgencyService");
const ClientService = require("../services/ClientService");



exports.getAgency = async (req, res) => {

    try {
        const data = await ClientService.findClient();

        return res.send({
            status: 1,
            message: "success",
            data: data.data
        });
    } catch (error) {
        return res.send({
            status: 0,
            message: error.message,

        });
    }
}



exports.createAgency = async (req, res) => {

    try {
        const { agencyId, name, address1, address2, state, city, mobile, clients } = req.body;
        const data = {
            agencyId,
            name,
            address1,
            address2,
            state,
            city,
            mobile,
        }
        /**
          * Here we are validating Fuel Dispences  data
          */
        const ValidateData = await AgencyService.validateAgencyData({
            data,
        });

        if (!ValidateData.status)
            return res.send({
                status: 0,
                message: ValidateData.message,
            });

        const email = [];

        for (let i = 0; i < clients.length; i++) {
            const data = clients[i];
            if (email.includes(data.email)) {
                return res.send({
                    status: 0,
                    message: "Duplicate Client Email",
                });
            }
            email.push(data.email);
            const ValidateData = await ClientService.validateClientData({ data });
            if (!ValidateData.status)
                return res.send({
                    status: 0,
                    message: ValidateData.message,
                });
        }


        const agnRecord = await AgencyService.createAgency({ data });
        for (let i = 0; i < clients.length; i++) {
            const data = clients[i];
            data.agencyId = agencyId;
            data.agency = agnRecord.data._id;
            const record = await ClientService.createClient({ data });
        }
        return res.send({
            status: 1,
            message: "success",
            data: req.body
        });
    } catch (error) {
        return res.send({
            status: 0,
            message: error.message,

        });
    }
}



exports.updateClient = async (req, res) => {
    try {
        const { name, email, mobile, totalBill, agencyId } = req.body;
        const data = {
            name, email, mobile, totalBill, agencyId
        }
        const agencyData = await agency.findOne({
            agencyId: agencyId
        });
        // check email exist
        if (!agencyData) {
            return res.send({
                status: 0,
                message: "Agency Id does not exist",
            });
        };

        const clientData = await client.findOne({
            email: email
        });
        // check email exist
        if (!clientData) {
            return res.send({
                status: 0,
                message: "Client does not exist",
            });
        };
        const record = await ClientService.updateClient({ data });
        return res.send({
            status: 1,
            message: "success",
            data: record.data
        });
    } catch (error) {
        return res.send({
            status: 0,
            message: error.message,

        });
    }
}
