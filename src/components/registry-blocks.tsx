import type { ReactNode } from "react";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";

type BlockComponent = () => ReactNode | Promise<ReactNode>;

export type RegistryBlock = {
  name: string;
  component: BlockComponent;
  previewClassName?: string;
};

export const registryBlocks: RegistryBlock[] = [
  {
    name: "hello-world",
    component: HelloWorld,
    previewClassName: "min-h-[400px]",
  },
  {
    name: "example-form",
    component: ExampleForm,
    previewClassName: "min-h-[500px]",
  },
  {
    name: "example-with-css",
    component: ExampleCard,
    previewClassName: "min-h-[400px]",
  },
];
