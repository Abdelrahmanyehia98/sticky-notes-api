import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: [3,"name must be atleast 3 letters"],
            maxLength: [20,"name must be at most 20 letters"],
            trim: true
        },
        age: {
            type: Number,
            required: true,
            minLength: [18, "Age must be at least 18 years old"],
            maxLength: [60, "Age must be at most 60 years old"],
            index: {
                name: "idx_age"
            }
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true,
                name: "idx_email_unique"
            }
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true
        }
    }, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    collection: "users"
});


const User = mongoose.model("User", userSchema);

export default User;
