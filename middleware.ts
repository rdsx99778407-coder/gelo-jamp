import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // A página de login precisa ser pública, senão há loop de redirecionamento
      if (pathname.startsWith("/admin/login")) {
        return true;
      }

      if (pathname.startsWith("/admin")) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};