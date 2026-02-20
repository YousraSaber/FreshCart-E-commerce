import React from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";

export default function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner className="size-16 text-green-600" />
          </EmptyMedia>
          <EmptyDescription className="text-md font-semibold">
            Just a moment...
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
