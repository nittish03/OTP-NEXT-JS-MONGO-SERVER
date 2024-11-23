import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      sparse: true 
    },
    username: { 
      type: String, 
      unique: true, 
      sparse: true 
    },
    email: { 
      type: String, 
      unique: true, 
      sparse: true 
    },
    hashedPassword: { 
      type: String 
    },
    image: { 
      type: String 
    }
  },
  { 
    timestamps: true // Automatically handles createdAt and updatedAt
  }
);

// Ensure we don't redefine the model if it already exists
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
