import { Pool } from "pg/lib";
import { config } from "../../config";
const pool = new Pool(config);

export default async function handler(request, response) {
  const { name, eventId } = request.body;
  const query = `INSERT INTO people (name, event_id) VALUES ('${name}', '${eventId}');`;

  try {
    const client = await pool.connect();
    const res = await client.query(query);
    console.log(res);
    response.json({
      message: "Success!"
    });
  } catch (err) {
    response.status(500).json({
      message: err.message
    });
  }
}
