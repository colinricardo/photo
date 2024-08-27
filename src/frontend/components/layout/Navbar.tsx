import { SignOutButton } from "@clerk/nextjs";
import { CircleUser, Database, FileText, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DarkModeToggle from "@/frontend/components/common/DarkModeToggle";
import NavbarButtons from "@/frontend/components/layout/NavbarButtons";
import {
  ROUTE_INTENTIONAL_ERROR,
  ROUTE_PROFILE,
  ROUTE_SIGN_IN,
} from "@/frontend/navigation/routes";
import { APP_NAME } from "@/backend/config";

export default ({ children }: { children: React.ReactNode }) => {
  const renderDesktop = () => (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-3">
          <Link href="/" className="flex items-center font-semibold">
            <span className="">{APP_NAME}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href={ROUTE_PROFILE}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CircleUser className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </div>
        <NavbarButtons />
      </div>
    </div>
  );

  const renderMobile = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <span className="">{APP_NAME}</span>
          </Link>

          <Link
            href={ROUTE_PROFILE}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <CircleUser className="h-5 w-5" />
            Profile
          </Link>
        </nav>
        <NavbarButtons />
      </SheetContent>
    </Sheet>
  );

  const renderHeader = () => (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4">
      {renderMobile()}
      <div className="flex-1" />
      <DarkModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link className="cursor-default" href={ROUTE_PROFILE}>
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link className="cursor-default" href={ROUTE_INTENTIONAL_ERROR}>
              Intentional Error
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <SignOutButton redirectUrl={ROUTE_SIGN_IN}>
              <span className="w-full">Sign out</span>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );

  const renderMain = () => (
    <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr]">
      {renderDesktop()}
      <div className="flex flex-col h-screen">
        {renderHeader()}
        {renderMain()}
      </div>
    </div>
  );
};
