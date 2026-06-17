export default function WpList({ ordered, children, className }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={className}>{children}</Tag>;
}
