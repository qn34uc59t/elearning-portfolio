import { TOOL_CATEGORIES } from "@/data/toolCategories";
import styles from "./WorkflowToolsContent.module.css";

export default function WorkflowToolsContent() {
  return (
    <div className={styles.toolsGrid} data-tools-content>
      {TOOL_CATEGORIES.map((category) => (
        <article
          key={category.title}
          className={styles.toolColumn}
          data-tool-column
        >
          <h2 className={styles.toolTitle}>{category.title}</h2>
          <p className={styles.toolDescription}>{category.description}</p>
          <ul className={styles.toolList}>
            {category.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
