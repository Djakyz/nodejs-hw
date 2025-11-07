import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Get all notes
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const pageNum = Number(page);
  const perPageNum = Number(perPage);
  const filter = { userId: req.user._id };

  if (tag) {
    filter.tag = tag;
  }

  if (typeof search === 'string' && search.trim().length > 0) {
    filter.$text = { $search: search.trim() };
  }

  const totalNotes = await Note.countDocuments(filter);
  const notes = await Note.find(filter)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * perPageNum)
    .limit(perPageNum);

  const totalPages = Math.ceil(totalNotes / perPageNum) || 1;

  return res.status(200).json({
    page: pageNum,
    perPage: perPageNum,
    totalNotes,
    totalPages,
    notes,
  });
};

// Get note by ID
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findOne({ _id: noteId, userId: req.user._id });

  if (!result) {
    throw createHttpError(404, `Note with id=${noteId} not found`);
  }

  res.json(result);
};

// Add new note
export const createNote = async (req, res) => {
  const result = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(result);
};

// Update note by ID
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw createHttpError(404, `Note with id=${noteId} not found`);
  }

  res.json(result);
};

// Delete note by ID
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const result = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!result) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(result);
};
