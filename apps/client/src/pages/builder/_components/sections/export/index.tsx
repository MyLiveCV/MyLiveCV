import { t } from "@lingui/macro";

import { getMetaDataSectionIcon } from "../../shared/metadata-section-icon";
import { JsonExport } from "./json-export";
import { PdfExport } from "./pdf-export";

export const ExportSection = () => {
  return (
    <section id="export" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getMetaDataSectionIcon("export")}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Export`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <JsonExport />

        <PdfExport />
      </main>
    </section>
  );
};

export * from "./json-export";
export * from "./pdf-export";
