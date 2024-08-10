import mongoose from "mongoose";

import { ApiError } from "./utils/ApiErrors.js";
import { asyncHandler } from "./utils/asyncHandlerCode.js";
import { ApiResponse } from "./utils/ApiResponses.js";

const DB_NAME = process.env.DataBase_Name;

const connectToDB = asyncHandler(async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MongoDB_URI}/${DB_NAME}`,
      {
        writeConcern: {
          w: "majority",
        },
      }
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`
    );
    const response = new ApiResponse(200, {
      message: "Database connected successfully",
    });
    console.log(response);
  } catch (err) {
    const error = new ApiError(
      500,
      "MongoDB connection error",
      [err.message],
      err.stack
    );

    // console.error(error);

    // Exit process with failure code
    process.exit(1);
  }
});

export default connectToDB;
