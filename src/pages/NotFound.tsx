import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <Seo
        title="Page not found — AmigoXcel"
        description="This page doesn't exist. Head back to the AmigoXcel home page to explore talent, technology, training and media services."
        path={location.pathname}
        noindex
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary-hover">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
