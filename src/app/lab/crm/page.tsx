import { LabFrame } from "@/components/lab/LabFrame";
import { CRMDemo } from "@/components/lab/CRMDemo";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Best CRM — demonstração interativa",
  "Experimente cadastro, pipeline, tarefas e indicadores com dados fictícios.",
  "/lab/crm",
);
export default function CRMPage() {
  return (
    <LabFrame slug="best-crm">
      <CRMDemo />
    </LabFrame>
  );
}
