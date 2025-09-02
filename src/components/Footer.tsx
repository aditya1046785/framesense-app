"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.privacy')}</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.terms')}</Link>
        </div>
      </div>
    </footer>
  );
}
