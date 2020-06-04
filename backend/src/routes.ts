import express from "express";

const routes = express.Router();

routes.get("/teste", (request, response) => {
  return response.json([
    {
      name: "Victor",
      age: 22,
    },
  ]);
});

export default routes;
