import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        impact: { type: String, required:true },
        trajectory: { type: Number, required: true },
        category: { type: String, required: true },
        additionalInfo: { type: String, default: "" }
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Empresa", empresaSchema); 