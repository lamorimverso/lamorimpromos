export function BrandMark() {
  return (
    <a href="#topo" className="brand-mark" aria-label="LamorimPromos — início">
      <img
        src="/lamorimpromos-avatar.png"
        alt="LamorimPromos"
        width={80}
        height={80}
        className="brand-avatar"
      />
      <span className="brand-copy">
        <span className="brand-name">LamorimPromos</span>
        <span className="site-tagline">Descontos exclusivos para você</span>
      </span>
    </a>
  );
}
