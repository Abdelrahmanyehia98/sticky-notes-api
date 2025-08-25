import Note from '../../../DB/Models/notes.model.js';


export const CreateNoteService = async (req, res) => {
   const { _id: userId } = req.loggedInUser;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Note.create({ title, content, userId });
    return res.status(201).json({ message: "Note created successfully", note });
}


export const UpdateNoteService = async (req, res) => {

   const { _id: userId } = req.loggedInUser;
    const { noteId } = req.params;

    if (!noteId) return res.status(400).json({ message: "noteId is required" });

    const update = {};
    if (req.body.title !== undefined) update.title = req.body.title;
    if (req.body.content !== undefined) update.content = req.body.content;

    if (!Object.keys(update).length) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found or not yours" });
    }

    return res.status(200).json({ message: "Note updated successfully", note });

}


export const ReplaceNoteService = async (req, res) => {

    const { _id: userId } = req.loggedInUser;
    const { noteId } = req.params;
    const { title, content } = req.body;

    if (!noteId) return res.status(400).json({ message: "noteId is required" });
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const replaced = await Note.findOneAndReplace(
      { _id: noteId, userId },
      { title, content, userId },
      { new: true, runValidators: true }
    );

    if (!replaced) {
      return res.status(404).json({ message: "Note not found or not yours" });
    }

    return res.status(200).json({ message: "Note replaced successfully", note: replaced });

}


export const UpdateAllNoteService = async (req, res) => {
    const { _id: userId } = req.loggedInUser;
    const { title } = req.body;

    if (!title) return res.status(400).json({ message: "title is required" });

    const result = await Note.updateMany({ userId }, { $set: { title } });

    return res.status(200).json({
      message: "All titles updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
};


export const DeleteNoteService = async (req, res) => {
    const { _id: userId } = req.loggedInUser;
    const { noteId } = req.params;

    if (!noteId) return res.status(400).json({ message: "noteId is required" });

    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found or not yours" });
    }

    return res.status(200).json({ message: "Note deleted successfully", note });

};


export const GetPageNotesService = async (req, res) => {
    const { _id: userId } = req.loggedInUser;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      Note.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Note.countDocuments({ userId })
    ]);

    return res.status(200).json({
      message: "Notes fetched successfully",
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      notes
    });
};


export const GetNoteByIdService = async (req, res) => {
    const { _id: userId } = req.loggedInUser;
    const { id: noteId } = req.params;

    if (!noteId) return res.status(400).json({ message: "noteId is required" });

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note fetched successfully", note });

};


export const GetNoteByContentService = async (req, res) => {
    const { _id: userId } = req.loggedInUser;
    const content = (req.query.content || "").trim();
    if (!content) return res.status(400).json({ message: "Content is required" });

    const note = await Note.findOne({
      userId,
      content: { $regex: content, $options: "i" }
    });

    if (!note) return res.status(404).json({ message: "No note found" });

    return res.status(200).json({ message: "Note fetched successfully", note });

};


export const GetNotesWithUserService = async (req, res) => {
    const userId = req.loggedInUser._id;

    const notes = await Note
      .find({ userId })
      .select("title userId createdAt")
      .populate("userId", "name email");

    return res.status(200).json({ message: "Notes fetched successfully", notes });

};


export const deleteAllNotesService = async (req, res) => {
    const { _id: userId } = req.loggedInUser;

    const result = await Note.deleteMany({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No note found" });
    }

    return res.status(200).json({
      message: "All notes deleted successfully",
      deletedCount: result.deletedCount
    });

};