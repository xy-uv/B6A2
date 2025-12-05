import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/global_error_handler";
import { initDB } from "./config/db";
import router from "./routes";
import reply from "./utils/reply";

const app: Application = express();

//? Database initialization
initDB();

//! Calling parser middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Handling all existing routes
app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  reply(res, {
    statusCode: 200,
    success: true,
    message: "Server is ready for SERVE!!",
  });
});

app.get("/health", (_req: Request, res: Response) => {
  reply(res, {
    statusCode: 200,
    success: true,
    message: "Server health is GREAT!!",
  });
});

//! Calling global error handler
app.use(globalErrorHandler);

//! Handling 404-> not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Requested URL not found!!",
    errors: `${req.path} are't a valid url to request`,
  });
});
export default app;
