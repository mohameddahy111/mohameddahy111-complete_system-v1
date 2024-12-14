import mongoose from "mongoose";

{
 /**
   name: "",
   price: "",
   category: "",
   brand: "",
   stock: "",
   stock_min: "",
   serial_number: "",
   description: "",
   pricing_policy: {
    purchase_price: "",
    additionalـcosts: "",
    profitـrate: "",
    profitـrate_type: "pre",
    value_added_tex: "",
    adds_consts: "",
    price_type: "fixed",
    fixed: {
     price: "",
     offer: false,
     offer_value: "",
     offer_value_type: "pre"
    },
    flexible: [
     {
      title: "",
      price: "",
      offer: false,
      offer_value: "",
      offer_value_type: "pre"
     }
    ]
   },
   main_img: {
    url: "",
    img_id: ""
   },
   swiper_images: []


     */
}

export const porductSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 category: {
  type: String,
  required: true
 },
 brand: {
  type: String,
  required: true
 },
 stock: {
  type: Number,
  required: true
 },
 stock_min: {
  type: Number,
  required: true
 },
 serial_number: {
  type: String,
 
 },
 description: {
  type: String,
  required: true
 },
 pricing_policy: {
  purchase_price: {
   type: String,
   required: true
  },
  additionalـcosts: {
   type: Number
  },
  profitـrate: {
   type: Number,
   required: true
  },
  profitـrate_type: {
   type: String,
   required: true
  },
  value_added_tex: {
   type: String,
   required: true
  },
  adds_consts: {
   type: String
  },
  price_type: {
   type: String,
   required: true,
   enum: ["fixed", "flexible"]
  },
  fixed: {
   title: {
    type: String
   },
   price: {
    type: Number
   },
   offer: {
    type: Boolean,
    default: false
   },
   offer_value: {
    type: String
   },
   offer_value_type: {
    type: String
   }
  },

  flexible: [
   {
    title: {
     type: String
    },
    price: {
     type: Number
    },
    offer: {
     type: Boolean,
     default: false
    },
    offer_value: {
     type: Number
    },
    offer_value_type: {
     type: String
    }
   }
  ]
 },
 main_img: {
  url: {
   type: String,
   required: true
  },
  img_id: {
   type: String,
   required: true
  }
 },
 swiper_images: {
  type: Array
 }
},{timestamps: true  , });

const Product = mongoose.models.Product || mongoose.model("Product", porductSchema);

export default Product;

