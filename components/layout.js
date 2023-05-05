import LeftBar from "./leftbar";

export default function Layout({children}) {
  return (
    <div className="flex max-w-screen-lg mx-auto gap-8 pt-3">
        <div className="w-1/3">
          <LeftBar />
        </div>
        <div className="w-2/3">
          {children}
        </div>
      </div>
  )
}
