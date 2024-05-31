// src/store.js
import { atom } from 'nanostores';

// Atom to manage request status
export const requestStatus = atom({ isLoading: false, error: null });
