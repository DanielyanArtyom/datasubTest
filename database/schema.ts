import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  amount: String,
  card_number: String,
  card_expirationDate: String,
  card_cvc: String,
});

const FormModel =
  mongoose.model("UserInput") || mongoose.model("UserInput", formSchema);

export default FormModel;
