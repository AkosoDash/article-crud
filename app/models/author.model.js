import mongoose from "mongoose";

export default authorSchemaModel => {
    const Author = mongoose.model(
      "author",
      new mongoose.Schema(
        {
          username: String,
          password: String,
          email: String,
          telp: String
        },
        { 
            timestamps: true
        }
      )
    );
    return Author;
  };
  