"use client";

import { useState } from "react";
import { DOCK_TOOLS } from "@/data/dockTools";
import styles from "./ToolsDock.module.css";

function getItemClass(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === null) {
    return "";
  }

  if (index === hoveredIndex) {
    return styles.hover;
  }

  if (Math.abs(index - hoveredIndex) === 1) {
    return styles.siblingClose;
  }

  if (Math.abs(index - hoveredIndex) === 2) {
    return styles.siblingFar;
  }

  return "";
}

export default function ToolsDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.dockWrap} data-tools-dock>
      <nav className={styles.navBar} aria-label="Tools">
        <ul className={styles.navList}>
          {DOCK_TOOLS.map((tool, index) => (
            <li
              key={tool.name}
              className={`${styles.navItem} ${getItemClass(index, hoveredIndex)}`}
            >
              <div
                className={styles.navItemHitArea}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`${styles.tooltip} ${
                    hoveredIndex === index ? styles.tooltipVisible : ""
                  }`}
                >
                  {tool.name}
                </div>
                <span className={styles.navItemLink} aria-hidden="true">
                  <img
                    src={tool.icon}
                    loading="eager"
                    alt={tool.alt}
                    className={styles.image}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
