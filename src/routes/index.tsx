import { createFileRoute } from "@tanstack/react-router";
import { registryItemSchema } from "shadcn/schema";
import { CopyCommandButton } from "@/components/copy-command-button";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { registryBlocks } from "@/components/registry-blocks";
import { cn } from "@/lib/utils";

import registry from "../../registry.json";

export const Route = createFileRoute("/")({
  component: Home,
});

const registryItemLookup = new Map(
  registry.items.map((item) => [item.name, item]),
);

function getRegistryItem(name: string) {
  const item = registryItemLookup.get(name);
  if (!item) return null;
  const parsed = registryItemSchema.safeParse(item);
  return parsed.success ? parsed.data : null;
}

const registryScope = registry.name ?? "registry";

function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        {registryBlocks.map((block) => {
          const registryItem = getRegistryItem(block.name);
          if (!registryItem) return null;
          const BlockComponent = block.component;
          const command = `npx shadcn@latest add @${registryScope}/${registryItem.name}`;

          return (
            <section
              key={registryItem.name}
              className="flex flex-col gap-4 border rounded-lg p-4 relative"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{registryItem.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {registryItem.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <CopyCommandButton
                    command={command}
                    label={`@${registryScope}/${registryItem.name}`}
                  />
                  <OpenInV0Button name={registryItem.name} className="w-fit" />
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center justify-center rounded-lg border bg-muted/30 p-4 min-h-[350px]",
                  block.previewClassName,
                )}
              >
                <BlockComponent />
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
