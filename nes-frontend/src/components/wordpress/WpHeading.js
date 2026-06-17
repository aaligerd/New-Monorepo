export default function WpHeading({ level, children, className }) {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
}
