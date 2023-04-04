"use strict";
const CommonService = require("./CommonService");
const client = require('../models/Client');
const validationRule = {
  name: {
    fieldName: "name",
    fieldNameToShow: "Client Name",
    type: "string",
    required: true,
  },
  email: {
    fieldName: "email",
    fieldNameToShow: "Client Email",
    type: "string",
    required: true,
  },
  mobile: {
    fieldName: "mobile",
    fieldNameToShow: "Client Mobile",
    type: "string",
    required: true,
  },
  totalBill: {
    fieldName: "totalBill",
    fieldNameToShow: "Total Bill",
    type: "integer",
    required: true,
  }
};

exports.validateClientData = async ({ data }) => {
  try {

    const DataValidation = CommonService.validationOfFieldData(
      validationRule,
      data
    );

    if (DataValidation.status == 0) {
      return {
        status: 0,
        message: DataValidation.message,
      };
    };

    const agencyData = await client.findOne({
      email: data.email
    });
    // check email exist
    if (agencyData) {
      return {
        status: 0,
        message: "Client Email Already exist",
      };
    };
    return {
      status: 1,
      message: "success",
    };
  } catch (error) {
    return {
      status: 1,
      message: error.message,
      data: {},
    };
  }
};

exports.findClient = async () => {
  try {
    const FindRecord = (await client.find().sort({totalBill:-1}).populate("agency")).map(d=>{
      return {
        agencyName:d.agency.name,
        clientName:d.name,
        totalBill:d.totalBill
      }
    });
    if (!FindRecord) {
      return {
        status: 0,
        message: "record not found",
      };
    }

    return {
      status: 1,
      message: "success",
      data: FindRecord,
    };
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

exports.createClient = async ({ data }) => {
  try {

    const AddRecord = await client.create(data);
    return {
      status: 1,
      data: AddRecord
    }
  } catch (error) {
    console.log("error", error);
    return {
      status: 0,
      message: error.message,
      data: {},
    };
  }
};



exports.updateClient = async ({ data }) => {
  try {
    await client.findOneAndUpdate({ email: data.email }, {
      name: data.name,
      mobile: data.mobile,
      totalBill: data.totalBill,
      agencyId: data.agencyId,
    });
    const AddRecord = await client.findOne({ email: data.email });
    return {
      status: 1,
      data: AddRecord
    }
  } catch (error) {
    console.log("error", error);
    return {
      status: 0,
      message: error.message,
      data: {},
    };
  }
};