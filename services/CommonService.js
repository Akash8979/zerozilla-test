/* ~~~~~~~~~~~~
 * Common Services
 * ~~~~~~~~~~~~~~~~~~~
 */

exports.validationOfFieldData = (validationRule, fieldData) => {
  for (let element of Object.keys(fieldData)) {
    if (validationRule[element]) {
      if (validationRule[element].required && !fieldData[element]) {
        return {
          status: 0,
          message: validationRule[element].fieldNameToShow + " is required",
        };
      }
      if (
        validationRule[element].required &&
        validationRule[element].type == "integer" &&
        isNaN(fieldData[validationRule[element].fieldName])
      ) {
        return {
          status: 0,
          message:
            validationRule[element].fieldNameToShow + " should be integer",
        };
      }

      if (
        validationRule[element].required &&
        validationRule[element].type == "date" &&
        (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(
          moment(fieldData[validationRule[element].fieldName]).format(
            "YYYY-MM-DD"
          )
        ) ||
          fieldData[validationRule[element].fieldName] == "")
      ) {
        return {
          status: 0,
          message: `Please fill a correct date formate for - , ${validationRule[element].fieldNameToShow}`,
        };
      }


      if (
        validationRule[element].required &&
        validationRule[element].type == "mobile" &&
        (!/^\d{10}/.test(fieldData[validationRule[element].fieldName]) ||
          fieldData[validationRule[element].fieldName] == "")
      ) {
        return {
          status: 0,
          message: `Please fill a correct Mobile for - , ${validationRule[element].fieldNameToShow}`,
        };
      }
    }
  }
  return {
    status: 1,
  };
};
exports.latestValidationOfFieldData = (validationRuleArray, fieldData) => {
  for (let element of Object.keys(validationRuleArray)) {

    if (
      validationRuleArray[element].required &&
      !fieldData[validationRuleArray[element].fieldName]
    ) {
      return {
        status: 0,
        message: validationRuleArray[element].fieldNameToShow + " is required",
      };
    }

    if (validationRuleArray[element]) {
      if (validationRuleArray[element].type == "date") {
        if (
          fieldData[validationRuleArray[element].fieldName] != null &&
          !/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(
            moment(fieldData[validationRuleArray[element].fieldName]).format(
              "YYYY-MM-DD"
            )
          )
        ) {
          return {
            status: 0,
            message: `Please fill a correct date formate for - , ${validationRuleArray[element].fieldNameToShow}`,
          };
        } else if (
          validationRuleArray[element].required &&
          fieldData[validationRuleArray[element].fieldName] == ""
        ) {
          return {
            status: 0,
            message:
              validationRuleArray[element].fieldNameToShow + " is required",
          };
        }
      } else if (validationRuleArray[element].type == "integer") {
        if (
          fieldData[validationRuleArray[element].fieldName] != null &&
          isNaN(fieldData[validationRuleArray[element].fieldName])
        ) {
          return {
            status: 0,
            message:
              validationRuleArray[element].fieldNameToShow +
              " should be integer",
          };
        } else if (
          validationRuleArray[element].required &&
          fieldData[validationRuleArray[element].fieldName] == null
        ) {
          return {
            status: 0,
            message:
              validationRuleArray[element].fieldNameToShow + " is required",
          };
        }
      } else if (
        validationRuleArray[element].type == "text" &&
        validationRuleArray[element].required
      ) {
        if (
          !fieldData[validationRuleArray[element].fieldName] ||
          String(fieldData[validationRuleArray[element].fieldName]).trim()
            .length == 0
        ) {
          return {
            status: 0,
            message:
              validationRuleArray[element].fieldNameToShow + " is required",
          };
        }
      }
    }
  }
  return {
    status: 1,
  };
};
