import dbConnection from "../../database/connection";
import FormModel from "../../database/schema";

export default function handler(req: any, res: any) {
  dbConnection().catch((error) => {
    res.status(400).json("Something goes wrong...");
  });

  const create = new FormModel({
    ...req.body,
  });

  create.save().then((response: any) => {
    res.status(200).json({
      requestId: response._id,
      amount: req.body.amount,
    });
  });
}
