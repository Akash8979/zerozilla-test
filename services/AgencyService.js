"use strict";
const CommonService = require("./CommonService");
const agency = require('../models/Agency');
const client = require('../models/Client');
const validationRule = {
  agencyId: {
    fieldName: "agencyId",
    fieldNameToShow: "Agency Id",
    type: "string",
    required: true,
  },
  name: {
    fieldName: "name",
    fieldNameToShow: "Name",
    type: "string",
    required: true,
  },
  address1: {
    fieldName: "address1",
    fieldNameToShow: "Address",
    type: "string",
    required: true,
  },
  state: {
    fieldName: "state",
    fieldNameToShow: "State",
    type: "string",
    required: true,
  },
  city: {
    fieldName: "city",
    fieldNameToShow: "City",
    type: "string",
    required: true,
  },
  mobile: {
    fieldName: "mobile",
    fieldNameToShow: "Mobile No",
    type: "mobile",
    required: true,
  },
};



exports.validateAgencyData = async ({ data }) => {
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
    }
    const agencyData = await agency.findOne({
      agencyId: data.agencyId
    });
    // check email exist
    if (agencyData) {
      return {
        status: 0,
        message: "Agency Id Already exist",
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
exports.createAgency = async ({ data }) => {
  try {
    const AddRecord = await agency.create(data);
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



