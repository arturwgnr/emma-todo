import Topbar from "./Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-container">
      <Topbar />
      <div className="page-content">{children}</div>
    </div>
  );
}
