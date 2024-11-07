import { Button } from "@/components/ui/button";
import { Paragraph, H1 } from "@/components/ui/typography";
import {
  Link,
  isRouteErrorResponse,
  useRouteError,
  useSearchParams,
} from "react-router-dom";
const ErrorMessageContainer = ({
  status,
  title,
  errorMessage,
}: {
  status: number;
  title: string;
  errorMessage: string;
}) => {
  return (
    <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Paragraph className="font-semibold">{status}</Paragraph>
        <H1 className="mt-4 tracking-tight sm:text-5xl">{title}</H1>
        <Paragraph className="mt-6 leading-7">{errorMessage}</Paragraph>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to={"/"}>
            <Button>Go back home</Button>
          </Link>
          <Link to={"/"} className="text-sm font-semibold">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

const ErrorPage = () => {
  const error = useRouteError();
  // get error message from query params
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get("error");
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorMessageContainer
          status={error.status}
          title="Page not found"
          errorMessage="Sorry, we couldn't find the page you're looking for."
        />
      );
    }

    if (error.status === 401) {
      return (
        <ErrorMessageContainer
          status={error.status}
          title="Unauthorized"
          errorMessage="You aren't authorized to see this"
        />
      );
    }

    if (error.status === 503) {
      return (
        <ErrorMessageContainer
          status={error.status}
          title="Service unavailable"
          errorMessage="Looks like our API is down"
        />
      );
    }

    if (error.status === 418) {
      return (
        <ErrorMessageContainer
          status={error.status}
          title="I'm a teapot"
          errorMessage="I'm a teapot"
        />
      );
    }
  }

  return (
    <ErrorMessageContainer
      status={500}
      title="Something went wrong"
      errorMessage={errorMessage || "Something went wrong"}
    />
  );
};

export default ErrorPage;
