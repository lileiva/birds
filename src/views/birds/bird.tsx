import { Bird } from "@/graphql/bird";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { AddNoteForm } from "./components/add-note-form";
import { Image } from "@/views/components/image";
import {
  AddNoteMutation,
  AddNoteMutationVariables,
} from "@/__generated__/graphql";
import { MutationTuple } from "@apollo/client";
import {
  apiNoteToApplicationNote,
  applicationNoteToApiNoteComment,
} from "@/lib/parse-notes";
interface BirdViewProps {
  bird: NonNullable<Bird>;
  addNoteMutation: MutationTuple<AddNoteMutation, AddNoteMutationVariables>;
}

export const BirdView = ({ bird, addNoteMutation }: BirdViewProps) => {
  const addMutationQuery = addNoteMutation[0];

  const ThumbnailImage = useMemo(() => {
    return <Image src={bird.thumb_url} alt={bird.english_name} ratio={1} />;
  }, [bird.thumb_url, bird.english_name]);

  return (
    <div className="w-full">
      <div className="px-6 py-4 flex justify-between">
        <h1 className="text-[32px] leading-[40px] font-bold text-[#0D171C] tracking-[-0.8px]">
          <Link to="/" className="text-[hsla(200,37%,8%,0.4)]">
            Birds /
          </Link>{" "}
          {bird.english_name}
        </h1>
        <AddNoteForm
          onCancel={() => undefined}
          onSubmit={async (values: { location: string; note: string }) => {
            await addMutationQuery({
              variables: {
                birdId: bird.id,
                comment: applicationNoteToApiNoteComment({
                  location: values.location,
                  note: values.note,
                }),
                timestamp: Math.floor(Date.now() / 1000),
              },
            });
          }}
        />
      </div>
      <hr className="border-[#D5DADF]" />
      <div className="px-6 py-4">
        <div className="max-w-xs">
          <Image
            src={bird.image_url}
            alt={bird.english_name}
            ratio={16 / 9}
            enableIntersectionObserver={false}
            enableZoom
          />
        </div>
        <div>
          <h3 className="my-5 text-[22px] leading-[27.5px] font-bold tracking-[-0.33px]">
            Notes
          </h3>
          {bird.notes.map((note) => {
            const applicationNote = apiNoteToApplicationNote(note);
            return (
              <div
                key={applicationNote.id}
                className="flex flex-row gap-4 mb-4"
              >
                <div className="w-[56px] h-[56px] rounded-lg">
                  {ThumbnailImage}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[16px] leading-[24px] font-medium text-[#0D171C] font-['Inter']">
                    {applicationNote.location}
                  </span>
                  <p className="text-[14px]  leading-[21px] text-[hsla(204,31%,45%,1)] mt-1 font-['Inter'] font-[400] tracking-[0px]">
                    {applicationNote.note}
                  </p>
                </div>
              </div>
            );
          })}
          {bird.notes.length === 0 && (
            <p className="text-[16px] leading-[24px] text-[#0D171C]">
              No notes found
            </p>
          )}
        </div>
        <div>
          <h3 className="my-5 text-[22px] leading-[27.5px] font-bold tracking-[-0.33px]">
            In Other Languages
          </h3>
          <hr className="border-[#D5DADF]" />
          <div className="grid grid-cols-2 gap-4">
            <p className="flex flex-col gap-2 my-4 pr-2 text-[14px] leading-[21px]">
              <span className="text-[hsla(204,31%,45%,1)]">English</span>
              <span>{bird.english_name}</span>
            </p>
            <p className="flex flex-col gap-2 my-4 pr-2 text-[14px] leading-[21px]">
              <span className="text-[hsla(204,31%,45%,1)]">Latin</span>
              <span>{bird.latin_name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
