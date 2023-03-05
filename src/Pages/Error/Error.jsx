import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-page-container">
      <h1 className="error-page-title">Oops!</h1>
      <p className="error-page-text">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="error-page-text">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
