import mongoose from "mongoose";

export const dbContact = (url:string) => {
  mongoose
    .connect(url as string)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
};
