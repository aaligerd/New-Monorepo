import parse, { domToReact } from "html-react-parser";
import WpHeading from "./WpHeading";
import WpParagraph from "./WpParagraph";
import WpImage from "./WpImage";
import WpBlockquote from "./WpBlockquote";
import WpList from "./WpList";
import WpEmbed from "./WpEmbed";
import WpCodeBlock from "./WpCodeBlock";
import WpTable from "./WpTable";

// Helper to recursively find a child tag name within children
function findChild(node, tagName) {
  if (!node.children) return null;
  for (const child of node.children) {
    if (child.name === tagName) return child;
    const found = findChild(child, tagName);
    if (found) return found;
  }
  return null;
}

// Helper to recursively extract text from a node's children
function getTextContent(node) {
  if (!node) return "";
  if (node.type === "text") return node.data;
  if (!node.children) return "";
  return node.children.map(getTextContent).join("");
}

export default function WpContentRenderer({ html }) {
  if (!html) return null;

  const parserOptions = {
    replace: (domNode) => {
      // 1. Headings: h1 - h6
      if (domNode.name && ["h1", "h2", "h3", "h4", "h5", "h6"].includes(domNode.name)) {
        const level = parseInt(domNode.name.replace("h", ""), 10);
        return (
          <WpHeading level={level} className={domNode.attribs?.class}>
            {domToReact(domNode.children, parserOptions)}
          </WpHeading>
        );
      }

      // 2. Paragraphs: p
      if (domNode.name === "p") {
        return (
          <WpParagraph className={domNode.attribs?.class}>
            {domToReact(domNode.children, parserOptions)}
          </WpParagraph>
        );
      }

      // 3. Blockquotes: blockquote
      if (domNode.name === "blockquote") {
        return (
          <WpBlockquote className={domNode.attribs?.class}>
            {domToReact(domNode.children, parserOptions)}
          </WpBlockquote>
        );
      }

      // 4. Unordered & Ordered Lists: ul / ol
      if (domNode.name === "ul" || domNode.name === "ol") {
        return (
          <WpList ordered={domNode.name === "ol"} className={domNode.attribs?.class}>
            {domToReact(domNode.children, parserOptions)}
          </WpList>
        );
      }

      // 5. Code pre blocks: pre
      if (domNode.name === "pre") {
        const codeNode = findChild(domNode, "code");
        if (codeNode) {
          const codeText = getTextContent(codeNode);
          return <WpCodeBlock code={codeText} className={domNode.attribs?.class} />;
        }
      }

      // 6. Tables: table
      if (domNode.name === "table") {
        return (
          <WpTable className={domNode.attribs?.class}>
            {domToReact(domNode.children, parserOptions)}
          </WpTable>
        );
      }

      // 7. Figure wrapper checks (WordPress images / embeds usually wrap inside a figure)
      if (domNode.name === "figure") {
        const className = domNode.attribs?.class || "";

        // Image block
        if (className.includes("wp-block-image")) {
          const imgNode = findChild(domNode, "img");
          const captionNode = findChild(domNode, "figcaption");
          if (imgNode) {
            const src = imgNode.attribs?.src;
            const alt = imgNode.attribs?.alt || "";
            const caption = captionNode ? getTextContent(captionNode) : "";
            return <WpImage src={src} alt={alt} caption={caption} className={className} />;
          }
        }

        // Video / iframe embed block
        if (className.includes("wp-block-embed") || className.includes("wp-block-video")) {
          const iframeNode = findChild(domNode, "iframe");
          if (iframeNode) {
            const src = iframeNode.attribs?.src;
            const title = iframeNode.attribs?.title || "";
            return <WpEmbed src={src} title={title} className={className} />;
          }
        }
      }

      // 8. Individual direct Image checks (outside figures)
      if (domNode.name === "img") {
        const src = domNode.attribs?.src;
        const alt = domNode.attribs?.alt || "";
        return <WpImage src={src} alt={alt} className={domNode.attribs?.class} />;
      }

      // 9. Individual direct Iframe checks (outside figures)
      if (domNode.name === "iframe") {
        const src = domNode.attribs?.src;
        const title = domNode.attribs?.title || "";
        return <WpEmbed src={src} title={title} className={domNode.attribs?.class} />;
      }
    },
  };

  return <div className="article-body">{parse(html, parserOptions)}</div>;
}
