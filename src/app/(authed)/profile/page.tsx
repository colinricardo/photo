import { currentUser } from "@clerk/nextjs/server";

export default async () => {
  const user = await currentUser();
  const { emailAddresses } = user!;
  const { emailAddress: email } = emailAddresses[0];

  const renderMain = () => (
    <div className="flex flex-col items-center space-y-4 text-center justify-center w-full p-4">
      <p className="text-sm text-muted-foreground">
        You are signed in as: {email}
      </p>
    </div>
  );

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Profile</h1>
      </div>
      <div className="flex">{renderMain()}</div>
    </>
  );
};
