import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-2 text-white/80">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <Link to="/" className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">
          Go home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
