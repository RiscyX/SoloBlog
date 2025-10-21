import ErrorActions from "./ErrorActions";

export default function ErrorPage({ searchParams }: { searchParams?: { message?: string, from?: string } }) {
  const message = searchParams?.message ?? "Sorry, something went wrong";
  const from = searchParams?.from;
  
  return (
    <div>
      <h1>Error</h1>
      <p>
        {message && message !== "Sorry, something went wrong"
          ? (() => {
              try {
                return decodeURIComponent(message);
              } catch (e) {
                return message;
              }
            })()
          : message}
      </p>
      {
        // Display navigation link based on 'from' parameter
        // If 'from' is 'signup', show link to Sign Up page; otherwise, show link to Login page
        // This is handled inside the ErrorActions component
      }
      <ErrorActions from={from} />
    </div>
  );
}