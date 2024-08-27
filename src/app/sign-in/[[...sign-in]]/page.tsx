import { ROUTE_LAUNCH } from "@/frontend/navigation/routes";
import { SignIn } from "@clerk/nextjs";

export default () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn
        forceRedirectUrl={ROUTE_LAUNCH}
        fallbackRedirectUrl={ROUTE_LAUNCH}
        signUpForceRedirectUrl={ROUTE_LAUNCH}
        signUpFallbackRedirectUrl={ROUTE_LAUNCH}
      />
    </div>
  );
};
