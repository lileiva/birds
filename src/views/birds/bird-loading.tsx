import { Link } from "@tanstack/react-router";

export const BirdLoadingView = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="px-6 py-4 flex justify-between">
        <h1 className="text-[32px] leading-[40px] font-bold tracking-[-0.8px] flex flex-row gap-2 items-end">
          <Link to="/" className="text-[hsla(200,37%,8%,0.4)]">
            Birds /
          </Link>{" "}
          <span className="bg-gray-200 rounded w-16 sm:w-40 h-8" />
        </h1>
        <div className="h-10 w-32 bg-gray-200 rounded" />
      </div>
      <hr className="border-[#D5DADF]" />
      <div className="px-6 py-4">
        <div className="max-w-xs">
          <div className="bg-gray-200 rounded-lg w-full aspect-[16/9]" />
        </div>
        <div>
          <h3 className="my-5 text-[22px] leading-[27.5px] font-bold tracking-[-0.33px]">
            Notes
          </h3>
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex flex-row gap-4 mb-4">
              <div className="w-[56px] h-[56px] rounded-lg bg-gray-200" />
              <div className="flex flex-col justify-center flex-1">
                <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="my-5 text-[22px] leading-[27.5px] font-bold tracking-[-0.33px]">
            In Other Languages
          </h3>
          <hr className="border-[#D5DADF]" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 my-4 pr-2">
              <span className="text-[hsla(204,31%,45%,1)] text-[14px] leading-[21px]">
                English
              </span>
              <div className="h-5 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="flex flex-col gap-2 my-4 pr-2">
              <span className="text-[hsla(204,31%,45%,1)] text-[14px] leading-[21px]">
                Latin
              </span>
              <div className="h-5 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
