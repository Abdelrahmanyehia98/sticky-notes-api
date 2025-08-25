import { Router } from "express";
import * as service from "./Services/notes.service.js"
import { authenticationMiddlewares } from '../../Middlewares/authentication.middleware.js';
const notesController = Router()

notesController.post("/createNote", authenticationMiddlewares, service.CreateNoteService);
notesController.patch("/update/:noteId", authenticationMiddlewares, service.UpdateNoteService);
notesController.put("/replace/:noteId", authenticationMiddlewares, service.ReplaceNoteService);
notesController.patch("/all", authenticationMiddlewares, service.UpdateAllNoteService);
notesController.delete("/:noteId", authenticationMiddlewares, service.DeleteNoteService);
notesController.get("/paginate-sort", authenticationMiddlewares, service.GetPageNotesService);
notesController.get("/note-by-content", authenticationMiddlewares, service.GetNoteByContentService);
notesController.get("/note-with-user", authenticationMiddlewares, service.GetNotesWithUserService);
notesController.get("/:id", authenticationMiddlewares, service.GetNoteByIdService);
notesController.delete("/", authenticationMiddlewares, service.deleteAllNotesService);

export default notesController