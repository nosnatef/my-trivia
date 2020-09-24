import React from "react";

import ContentCard from "../components/ContentCard";

export default function AboutPage() {
  const content = (
    <div>
      <h1 class="mb-4 font-semibold text-xl">Made by Zhuohong Gu</h1>
      <div>
        <a href="https://github.com/nosnatef">
          <img alt="github icon" src={require("../images/github.png")}></img>
        </a>
      </div>
    </div>
  );

  return <ContentCard content={content} />;
}
