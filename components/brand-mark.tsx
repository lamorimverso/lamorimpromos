const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const repositoryOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repositoryName);
const isUserSite = repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath = isGitHubPagesBuild && !isUserSite ? `/${repositoryName}` : '';

export function BrandMark() {
  return (
    <a href="#topo" className="brand-mark" aria-label="Lamorim das Promoções — início">
      <span className="brand-art-frame" aria-hidden="true">
        <img
          src={`${basePath}/lamorimpromos-brand.png`}
          alt=""
          width={240}
          height={240}
          className="brand-art"
        />
      </span>
      <span className="brand-copy">
        <span className="brand-eyebrow">Games • Tech • Geek • Ofertas</span>
        <span className="brand-name">Lamorim das Promoções</span>
        <span className="site-tagline">Seu canal de promoções em games, tech, geek e muito mais.</span>
      </span>
    </a>
  );
}
