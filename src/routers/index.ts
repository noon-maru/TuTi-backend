import express from "express";
import ApiDocs from "@docs/index";

export const setupRouter = (app: express.Application) => {
  const { swaggerUI, specs } = new ApiDocs().getSwaggerOption();
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
};
