
import React from "react";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center mx-20">
 
      {children}
    </div>
  );
}
