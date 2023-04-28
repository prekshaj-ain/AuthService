const { StatusCodes } = require("http-status-codes");

const AppErrors = require("./error-handler");

class ValidationError extends AppErrors{
    constructor(error){
        let explanation = [];
        let name = error.name;
        error.errors.forEach(err => {
            explanation.push(err.message);
        })
        super(
            name,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST,
        )
    }
}

module.exports = ValidationError;