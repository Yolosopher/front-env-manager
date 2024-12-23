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
    HomeIcon,
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
    protected: [
        { href: "/", icon: HomeIcon, label: "Home" },
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/logout", icon: LogOutIcon, label: "Logout" },
    ],
    public: [
        { href: "/", icon: HomeIcon, label: "Home" },
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
                className="fixed z-10 bottom-[2dvh] left-1/2 -translate-x-1/2"
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
                <Separator orientation="vertical" className="h-full py-2" />
                {navbar[auth ? "protected" : "public"].map((item) => (
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
