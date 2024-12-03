import Loading from "./Loading";

export default function ReportLoading() {
  return (
    <div>
      <div className="flex flex-col items-center w-full gap-2 mb-2">
        <div className="flex gap-2 justify-center">
          <Loading className="h-[40px] w-[300px]" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        <Loading className="h-[100px]" />
        <Loading className="h-[100px]" />
        <Loading className="h-[100px]" />
        <Loading className="h-[100px]" />
      </div>
      <div className="mb-2">
        <Loading className="h-[333px]" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Loading className="h-[333px]" />
        <Loading className="h-[333px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Loading className="h-[40px]" />
        <Loading className="h-[40px]" />
      </div>
    </div>
  );
}
