import { Sidebar } from './Sidebar';

export function Layout({ children }) {
  return (
    <div className="flex bg-fundo min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}