import mongoose from "mongoose";

{
 /**
   name: "",
   slug: "",
   categoryId: "",
   brandId: "",
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
  required: true,
  unique: true
 },
 slug :{type:String , required: true , unique: true},
 categoryId: {
  type: mongoose.Schema.Types.ObjectId,ref: "Category",
  required: true
 },
 brandId: { type: mongoose.Schema.Types.ObjectId,ref: "Brand",required: true },
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
   type: Number,
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
    type: Number
   },
   offer_value_type: {
    type: String
   },
   stock: {
    type: Number,
   },
   stock_min: {
    type: Number,
   },
  
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
    },
    stock: {
      type: Number,
     },
     stock_min: {
      type: Number,
     },
    
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
},{timestamps: true  , toJSON: { virtuals: true }, toObject: { virtuals: true }});

const Product = mongoose.models.Product || mongoose.model("Product", porductSchema);

export default Product;

