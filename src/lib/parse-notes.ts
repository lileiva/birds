import { ApiNote, Note } from "@/graphql/notes";

const separator = "&&&&&";

export const apiNoteToApplicationNote = (note: ApiNote): Note => {
  const [location, noteText] = note.comment.split(separator);
  return {
    id: note.id,
    location,
    note: noteText,
  };
};

export const applicationNoteToApiNoteComment = (
  note: Omit<Note, "id">
): string => {
  return `${note.location}${separator}${note.note}`;
};
