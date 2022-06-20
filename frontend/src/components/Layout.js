import NavigationBar from "./NavigationBar";

export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen bg-black overflow-auto text-white">
      <div className="mx-2 flex ">
        <NavigationBar />
      </div>
      {children}
    </div>
  );
}
