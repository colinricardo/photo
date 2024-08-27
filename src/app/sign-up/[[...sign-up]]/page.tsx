import { ROUTE_LAUNCH } from "@/frontend/navigation/routes";
import { SignUp } from "@clerk/nextjs";

export default () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUp
        forceRedirectUrl={ROUTE_LAUNCH}
        fallbackRedirectUrl={ROUTE_LAUNCH}
        signInForceRedirectUrl={ROUTE_LAUNCH}
        signInFallbackRedirectUrl={ROUTE_LAUNCH}
      />
    </div>
  );
};
