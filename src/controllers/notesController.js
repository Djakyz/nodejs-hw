import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Get all notes
export const getAllNotes = async (req, res) => {
  const result = await Note.find();
  res.json(result);
};

// Get note by ID
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findById(noteId);

  if (!result) {
    throw createHttpError(404, `Note with id=${noteId} not found`);
  }

  res.json(result);
};

// Add new note
export const createNote = async (req, res) => {
  const result = await Note.create(req.body);
  res.status(201).json(result);
};

// Update note by ID
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw createHttpError(404, `Note with id=${noteId} not found`);
  }

  res.json(result);
};

// Delete note by ID
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findByIdAndDelete(noteId);

  if (!result) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(result);
};
