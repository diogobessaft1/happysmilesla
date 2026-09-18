import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-navy p-6 text-center text-brand-onDark">
      <div className="flex max-w-md flex-col items-center gap-6">
        <span className="text-6xl font-bold text-brand-yellow">404</span>
        <p className="text-xl text-brand-onDark/85">{t("notFound.title")}</p>
        <Button asChild variant="yellow" size="lg">
          <a href="/">
            {t("notFound.actions.backHome")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
