import { Request, Router } from "express";
import controller from "../controllers/item";

const itemRouter = Router();

itemRouter.get(
  "/:id",
  async (req: Request<{ id: string }>, res) => {
    if (!req.params.id) return res.status(400).send();
    if (Number.isNaN(req.params.id)) return res.status(500).send();
    const item = await controller.getItem(Number(req.params.id));

    if (item) {
      return res.json(item);
    }
    return res.status(404).send();
  }
);

itemRouter.get("/", async (_, res) => {
  const items = await controller.getItems();
  if (items) {
    return res.json(items);
  }
  return res.status(404).send();
});

itemRouter.get(
  "/name/:name",
  async (req: Request<{ name: string }>, res) => {
    if (!req.params.name) return res.status(400).send();
    const items = await controller.getItemByName(req.params.name);
    if (items) {
      return res.json(items);
    }
    return res.status(404).send();
  }
);

itemRouter.post("/", async (req: Request<{}, {}, { name: string }>, res) => {
  if (!req.body.name) {
    return res.status(400).send();
  }
  const result = await controller.createItem(req.body);

  if (result) {
    return res.status(201).json(result[0]);
  }
  return res.status(500).send();
});

itemRouter.put("/:id", (_, res) => {
  // TODO - To be implemented
  res.status(501).send();
});

itemRouter.delete(
  "/:id",
  async (req: Request<{ id: string }>, res) => {
    if (!req.params.id) return res.status(400).send();
    if (Number.isNaN(req.params.id)) return res.status(500).send();

    const result = await controller.removeItem(Number(req.params.id));

    if (result) return res.status(204).send();

    return res.status(500).send();
  }
);

export default itemRouter;
