import mongoose from "mongoose";


const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value !== value.toUpperCase();
            },
            message: "Title must not be entirely uppercase"
        }
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true }
});

const Note = mongoose.model("Note", notesSchema);

export default Note;