"use strict";
const CommonService = require("./CommonService");
const user = require('../models/User');
const validationRule = {
    email: {
        fieldName: "email",
        fieldNameToShow: "Email Id",
        type: "string",
        required: true,
    },
    password: {
        fieldName: "password",
        fieldNameToShow: "Passsword",
        type: "string",
        required: true,
    },
    name: {
        fieldName: "name",
        fieldNameToShow: "Name",
        type: "string",
        required: true,
    }
};


exports.validateUserData = async ({ data }) => {
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
        const userData = await user.findOne({
            email: data.email
        });
        // check email exist
        if (userData) {
            return {
                status: 0,
                message: "Email id Already exist",
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
exports.createContractorPerformance = async ({ data }) => {
    try {
        const AddRecord = await model.contractor_performances.create(data);
        const redcordId = AddRecord.id;
        let AddRecordContractorPerformanceData;
        if (AddRecord) {
            for (let i = 0; i < data.contractor_performance_data.length; i++) {
                const {
                    type,
                    equipment_name,
                    committed_count,
                    shift1_available,
                    shift2_available,
                    shift3_available,
                } = data.contractor_performance_data[i];
                const data1 = {
                    contractor_performance_id: redcordId,
                    type,
                    equipment_name,
                    committed_count,
                    shift1_available,
                    shift2_available,
                    shift3_available,
                };
                AddRecordContractorPerformanceData = await model.contractor_performance_datas.create(data1);
            }
            return {
                status: 1,
                message: "success",
                data: AddRecord,
            };
        }
    } catch (error) {
        console.log("error", error);
        return {
            status: 1,
            message: error.message,
            data: {},
        };
    }
};


