import { t } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";
import { useMemo } from "react";
import { matchRoutes, Outlet, useLocation } from "react-router-dom";

import { Header } from "@/client/components/header";
import { useAuthProviders } from "@/client/services/auth/providers";

import { SocialAuth } from "./_components/social-auth";

const authRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }];

export const AuthLayout = () => {
  const location = useLocation();
  const { providers } = useAuthProviders();
  const isAuthRoute = useMemo(() => matchRoutes(authRoutes, location) !== null, [location]);

  if (!providers) return null;

  // Condition (providers.length === 1) hides the divider if providers[] includes only "email"
  const hideDivider = !providers.includes("email") || providers.length === 1;

  return (
    <div className="relative">
      <Header />
      <div className="flex  w-screen lg:pt-12">
        <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[420px] sm:px-0 lg:basis-[640px] lg:px-12">
          <Outlet />

          {isAuthRoute && (
            <>
              <div className={cn("flex items-center gap-x-4", hideDivider && "hidden")}>
                <hr className="flex-1" />
                <span className="text-xs font-medium">
                  {t({
                    message: "or continue with",
                    context:
                      "The user can either login with email/password, or continue with GitHub or Google.",
                  })}
                </span>
                <hr className="flex-1" />
              </div>

              <SocialAuth />
            </>
          )}
        </div>

        {/* <div className="relative hidden lg:block lg:flex-1">
        <img
          width={1920}
          height={1080}
          alt="Open books on a table"
          className="h-screen w-full object-cover object-center"
          src="/backgrounds/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
        />

        <div className="absolute bottom-5 right-5 z-10 bg-primary/30 px-4 py-2 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://unsplash.com/photos/Oaqk7qqNh_c"
          >
            {t`Photograph by Patrick Tomasso`}
          </a>
        </div>
      </div> */}
      </div>
    </div>
  );
};
