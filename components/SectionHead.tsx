type Props = {
  id: string;
  index: number;
  total: number;
  label: string;
  title: string;
};

// The small "[ 02 / 05 ] WORK" label and the headline under it.
export default function SectionHead({ id, index, total, label, title }: Props) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <header className="section__head">
      <p className="eyebrow">
        <span className="eyebrow__count" aria-hidden="true">
          [ {pad(index)} / {pad(total)} ]
        </span>
        {label}
      </p>
      <h2 id={id} className="section__title">
        {title}
      </h2>
    </header>
  );
}
