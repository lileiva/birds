import { gql } from "@/__generated__/gql";

export const ADD_NOTE_MUTATION = gql(`
  mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
    addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
  }
`);

export type ApiNote = {
  id: string;
  comment: string;
  timestamp: number;
};

export type Note = {
  id: string;
  location: string;
  note: string;
};
