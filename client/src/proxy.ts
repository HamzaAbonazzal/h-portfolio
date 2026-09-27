import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// في Next.js 15+ تمت إعادة تسمية middleware إلى proxy
export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};