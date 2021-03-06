const ErrorResponse = require("./errorResponse");

const errorHandler = (err, req, res, next) => {
    console.log(err);

    let error = { ...err };

    if (err.name === 'UnauthorizedError') {
        error = new ErrorResponse(err.message, 401);
    }

    if (err.name === 'CastError') {
        const message = `Resource not found with id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(v => v.message);
        error = new ErrorResponse(message, 400);
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};




module.exports = errorHandler;