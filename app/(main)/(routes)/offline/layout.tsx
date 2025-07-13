import { ClerkProvider } from "@clerk/nextjs";
import { headers } from "next/headers";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") || "";

  const hideLayout = pathname.startsWith("/terms") || pathname.startsWith("/privacy") || pathname.startsWith("/offline");

  return (
    <html lang="en">
      <body className="font-sans">
        <ClerkProvider>
          {hideLayout ? (
            <main className="bg-white min-h-screen bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB] ">{children}</main>
          ) : (
            <div className="bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB] min-h-screen">
             
              <main>{children}</main>
            </div>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
