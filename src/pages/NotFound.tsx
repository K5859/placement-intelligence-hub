import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center font-body">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mb-4 shadow-xs">
        <FileQuestion className="h-8 w-8" />
      </div>
      <span className="font-mono text-sm font-bold text-blue-600">404 ERROR</span>
      <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        The requested URL does not match any valid route in the Placement Intelligence Hub.
      </p>
      <div className="mt-6">
        <Button asChild size="default" className="gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Companies Directory
          </Link>
        </Button>
      </div>
    </div>
  );
};
