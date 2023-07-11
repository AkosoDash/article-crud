import mongoose from "mongoose";

export default articleSchemaModel => {
    const Article = mongoose.model(
      "article",
      new mongoose.Schema(
        {
          title: String,
          author: String,
          text: String,
          published: Boolean
        },
        { 
            timestamps: true
        }
      )
    );
    return Article;
  };
  