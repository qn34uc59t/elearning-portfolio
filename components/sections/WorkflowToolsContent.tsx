"use client";

import { useState } from "react";
import ToolsDock from "@/components/sections/ToolsDock";
import { TOOL_CATEGORIES } from "@/data/toolCategories";
import styles from "./WorkflowToolsContent.module.css";

export default function WorkflowToolsContent() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleCategory = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div className={styles.toolsPanel} data-tools-content>
      <div className={styles.toolsGrid}>
        {TOOL_CATEGORIES.map((category, index) => {
          const isOpen = openIndex === index;
          const panelId = `tool-panel-${index}`;

          return (
            <article
              key={category.title}
              className={`${styles.toolColumn} ${isOpen ? styles.toolColumnOpen : ""}`}
              data-tool-column
            >
              <button
                type="button"
                className={styles.accordionTrigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleCategory(index)}
              >
                <span className={styles.accordionTitle}>{category.title}</span>
                <span className={styles.accordionIcon} aria-hidden="true" />
              </button>

              <h2 className={styles.toolTitle}>{category.title}</h2>

              <div id={panelId} className={styles.toolBody}>
                <p className={styles.toolDescription}>{category.description}</p>
                <ul className={styles.toolList}>
                  {category.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
      <ToolsDock />
    </div>
  );
}
