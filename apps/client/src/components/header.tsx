import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Header = () => (
  <motion.header
    className="sticky top-0 z-20"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } }}
  >
    <nav className="bg-background">
      <div className="flex items-center justify-between px-12">
        <div>
          <Link to="/" className="size-24">
            <Logo className="-ml-3" size={96} />
          </Link>
        </div>

        <div>
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  </motion.header>
);
