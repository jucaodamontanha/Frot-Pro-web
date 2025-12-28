export function Button({ children, variant = 'primary', ...props }) {
  const styles = {
    primary: "bg-brand-primary hover:bg-blue-700 text-white",
    secondary: "bg-brand-secondary hover:bg-slate-700 text-white",
    danger: "bg-brand-danger hover:bg-red-700 text-white",
  };

  return (
    <button 
      className={`px-4 py-2 rounded-painel font-medium transition-colors ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}