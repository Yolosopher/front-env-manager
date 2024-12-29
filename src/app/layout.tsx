import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "./_components/client-layout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const fullName = "Nika Nishnianidze (Yolosopher)";
// const veryshortdescription =
//     "EnvManager - Manage Environment Variables Across Projects";
const md = {
    title: "EnvManager",
    description:
        "Securely manage, organize, and control environment variables across multiple projects and environments. Features OAuth authentication, project workspaces, and API token management.",
    icons: {
        icon: "/favicon.ico",
        apple: "/favicon/apple-touch-icon.png",
        shortcut: "/favicon/apple-touch-icon.png",
    },
    creator: fullName,
    keywords: [
        "envmanager",
        "environment",
        "variables",
        "yolosopher",
        "cli-env-manager",
    ],
};

export const metadata: Metadata = {
    title: md.title,
    description: md.description,
    icons: md.icons,
    creator: md.creator,
    metadataBase: new URL("https://envmanager.yolosopher.site"),
    openGraph: {
        title: md.title,
        description: md.description,
        url: "https://envmanager.yolosopher.site",
        siteName: "EnvManager",
        images: [{ url: "/favicon/android-chrome-192x192.png" }],
    },
    manifest: "/favicon/site.webmanifest",
    keywords: md.keywords,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Toaster />
                    <ClientLayout>{children}</ClientLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
