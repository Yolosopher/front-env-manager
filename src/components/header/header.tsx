"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import {
    FolderKey,
    HomeIcon,
    KeyRound,
    LayoutDashboard,
    LogInIcon,
    LogOutIcon,
    UserPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import { buttonVariants } from "../ui/button";
import { Dock, DockIcon } from "../ui/dock";
import { Separator } from "../ui/separator";

const navbar = {
    homepage: { href: "/", icon: HomeIcon, label: "Home" },
    protected: [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/api-tokens", icon: KeyRound, label: "API Tokens" },
        { href: "/projects", icon: FolderKey, label: "Projects" },
        { href: "/logout", icon: LogOutIcon, label: "Logout" },
    ],
    public: [
        { href: "/auth/login", icon: LogInIcon, label: "Login" },
        { href: "/auth/signup", icon: UserPlusIcon, label: "Signup" },
    ],
};
const activeClass = "bg-primary/80 text-white";

const DockMenu = () => {
    const pathname = usePathname();
    const { auth } = useAuthStore();

    return (
        <TooltipProvider>
            <Dock
                direction="middle"
                className="fixed z-10 bottom-[2dvh] left-1/2 -translate-x-1/2 m-0"
            >
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ThemeSwitcher
                                className="rounded-full "
                                ariaLabel="Theme"
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                <DockIcon>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={navbar.homepage.href}
                                aria-label={navbar.homepage.label}
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                        size: "icon",
                                        className:
                                            navbar.homepage.href === pathname
                                                ? activeClass
                                                : pathname.includes(
                                                      navbar.homepage.href
                                                  ) &&
                                                  navbar.homepage.href !== "/"
                                                ? activeClass
                                                : "",
                                    }),
                                    "rounded-full aspect-square",
                                    navbar.homepage.href === "/logout" &&
                                        "bg-destructive/80 hover:bg-destructive"
                                )}
                            >
                                <navbar.homepage.icon className="size-4" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{navbar.homepage.label}</p>
                        </TooltipContent>
                    </Tooltip>
                </DockIcon>
                <Separator orientation="vertical" className="h-full py-2" />
                {navbar[auth?.id ? "protected" : "public"].map((item) => (
                    <DockIcon key={item.label}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    aria-label={item.label}
                                    className={cn(
                                        buttonVariants({
                                            variant: "ghost",
                                            size: "icon",
                                            className:
                                                item.href !== "logout" &&
                                                item.href === pathname
                                                    ? activeClass
                                                    : pathname.includes(
                                                          item.href
                                                      ) && item.href !== "/"
                                                    ? activeClass
                                                    : "",
                                        }),
                                        "rounded-full aspect-square",
                                        item.href === "/logout" &&
                                            "bg-destructive/80 hover:bg-destructive"
                                    )}
                                >
                                    <item.icon className="size-4" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                ))}
            </Dock>
        </TooltipProvider>
    );
};

export default DockMenu;
