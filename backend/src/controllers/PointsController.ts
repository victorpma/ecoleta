import connection from "../database/connection";
import { Request, Response, response } from "express";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const arrayItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await connection("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", arrayItems)
      .where("points.city", String(city))
      .where("points.uf", String(uf))
      .select("points.*")
      .distinct();

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await connection("points").where("id", id).first();

    if (!point)
      return response.status(400).json({ message: "Point not found!" });

    const items = await connection("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const txr = await connection.transaction();

    const [point_id] = await txr("points").insert({
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    const pointItems = items.map((item_id: number) => {
      return {
        point_id,
        item_id,
      };
    });

    await txr("point_items").insert(pointItems);

    await txr.commit();

    return response.json({ point_id });
  }
}

export default PointsController;
