import { Request, Response } from "express";
import { messageSchema } from "../validation/messageValidation";
import { pool } from "../config/database";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { error, value } = messageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: "The data is invalid",
        data: error.details.map((detail) => detail.message),
      });
    }

    const { name, phone, message } = value;

    const result = await pool.query(
      "INSERT INTO messages (name, phone, message) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, message]
    );

    res.status(200).json({
      message: "Message save",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving the message:", error);
    res.status(500).json({
      error: "Error saving the message",
    });
  }
};
