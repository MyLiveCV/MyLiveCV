import { t } from "@lingui/macro";
import {
  Brain,
  CloudSun,
  EnvelopeSimple,
  Eye,
  File,
  Files,
  Folder,
  GithubLogo,
  GoogleChromeLogo,
  GoogleLogo,
  IconContext,
  Layout,
  LinkedinLogo,
  Lock,
  Note,
  StackSimple,
  Star,
  Swatches,
  TextAa,
  Translate,
} from "@phosphor-icons/react";
import { cn, languages, templatesList } from "@reactive-resume/utils";
import { motion } from "framer-motion";

type Keyword = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};

const keywordLabel = cn(
  "flex cursor-default items-center justify-center gap-x-2 rounded bg-secondary px-4 py-3 text-sm font-medium leading-none text-primary transition-colors hover:bg-primary hover:text-background",
);

export const KeywordsSection = () => {
  const languagesCount = languages.length;
  const templatesCount = templatesList.length;

  const features: Keyword[] = [
    { icon: <Brain />, title: t`AI Integration` },
    { icon: <Translate />, title: t`Available in ${languagesCount} languages` },
    { icon: <GithubLogo />, title: t`Sign in with GitHub` },
    { icon: <GoogleLogo />, title: t`Sign in with Google` },
    { icon: <LinkedinLogo />, title: t`Sign in with LinkedIn` },
    { icon: <EnvelopeSimple />, title: t`Sign in with Email` },
    { icon: <Lock />, title: t`Secure with two-factor authentication` },
    { icon: <StackSimple />, title: t`${templatesCount} resume templates to choose from` },
    { icon: <Files />, title: t`Design single/multi page resumes` },
    { icon: <Folder />, title: t`Manage multiple resumes` },
    { icon: <Swatches />, title: t`Customisable colour palettes` },
    { icon: <Layout />, title: t`Customisable layouts` },
    { icon: <Star />, title: t`Custom resume sections` },
    { icon: <Note />, title: t`Personal notes for each resume` },
    { icon: <Lock />, title: t`Lock a resume to prevent editing` },
    { icon: <File />, title: t`Supports A4/Letter page formats` },
    { icon: <TextAa />, title: t`Pick any font from Google Fonts` },
    { icon: <GoogleChromeLogo />, title: t`Host your resume publicly` },
    { icon: <Eye />, title: t`Track views and downloads` },
    { icon: <CloudSun />, title: t`Light or dark theme` },
  ];

  return (
    <section id="features" className="relative bg-secondary-accent py-24 sm:py-32">
      <div className="container">
        <div className="space-y-6 leading-loose">
          <h2 className="text-4xl font-bold">{t`Unrivaled Features in Our Advanced Resume Builder`}</h2>
          <p className="max-w-4xl text-base leading-relaxed">
            {t`Experience the pinnacle of professional resume creation with our feature-rich Resume Builder. From multimedia integration to real-time updates, unlock a suite of sophisticated tools. Elevate your digital presence and career prospects with unparalleled features. Explore now for a distinguished resume that commands attention and enhances your professional standing.`}
          </p>

          <IconContext.Provider value={{ size: 14, weight: "bold" }}>
            <div className="!mt-12 flex flex-wrap items-center gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -50 }}
                  className={cn(keywordLabel, feature.className)}
                  whileInView={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                >
                  {feature.icon}
                  <h4>{feature.title}</h4>
                </motion.div>
              ))}

              <motion.p
                viewport={{ once: true }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: (features.length + 1) * 0.1 },
                }}
              >
                {t`and many more...`}
              </motion.p>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </section>
  );
};
