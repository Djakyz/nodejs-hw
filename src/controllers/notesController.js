import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const result = await Note.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get note by ID
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findById(noteId);

  if (!result) {
    return res.status(404).json({
      message: `Note with id=${noteId} not found`,
    });
  }

  res.json(result);
};

// Add new note
export const createNote = async (req, res) => {
  try {
    const result = await Note.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update note by ID
export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const result = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({
        message: `Note with id=${noteId} not found`,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
