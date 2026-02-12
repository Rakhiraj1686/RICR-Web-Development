import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>

      <h2 className="mt-4 text-3xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-(--color-primary) px-6 py-3 text-white font-medium hover:bg-(--color-primary-hover) transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
