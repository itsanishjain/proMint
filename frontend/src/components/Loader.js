
export default function GradientCircularLoading() {
  return (
    <div className="flex justify-center items-center py-3">
      <div className="rounded-full h-12 w-12 animate-spin bg-gradient-to-tr from-blue-300 to-blue-900  ">
        <div className="m-[0.1rem] bg-white rounded-full h-12 w-12"></div>
      </div>
    </div>
  );
}