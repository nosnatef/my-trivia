import React from "react";

export default function ContentCard({ content }) {
  return (
    <div class="flex justify-center m-auto h-screen">
      <div class="m-auto container bg-white shadow-md p-6 w-full max-w-xl">
        {content}
      </div>
    </div>
  );
}
