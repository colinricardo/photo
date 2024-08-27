import { currentUser } from "@clerk/nextjs/server";
import { api } from "@/trpc/server";

export default async () => {
  const clerkUser = await currentUser();
  const { emailAddresses } = clerkUser!;
  const { emailAddress: email } = emailAddresses[0];

  const user = await api.user.current();

  const renderMain = () => {
    return (
      <div className="flex flex-col items-center space-y-4 text-center justify-center w-full p-4">
        <p className="text-sm text-muted-foreground">From Clerk: {email}</p>
        <p className="text-sm text-muted-foreground">
          {`And from TRPC: ${user?.user?.id}`}
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Home</h1>
      </div>
      <div className="flex">{renderMain()}</div>
    </>
  );
};
