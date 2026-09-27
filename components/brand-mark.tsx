const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const repositoryOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repositoryName);
const isUserSite = repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath = isGitHubPagesBuild && !isUserSite ? `/${repositoryName}` : '';

export function BrandMark() {
  return (
    <a href="#topo" className="brand-mark" aria-label="Lamorim das Promoções — início">
      <span className="brand-logo-frame" aria-hidden="true">
        <img
          src={`${basePath}/lamorimpromos-avatar.png`}
          alt=""
          width={112}
          height={112}
          className="brand-avatar"
        />
      </span>
      <span className="brand-copy">
        <span className="brand-name">Lamorim das Promoções</span>
        <span className="site-tagline">Seu canal de promoções em games, tech, geek e muito mais.</span>
      </span>
    </a>
  );
}
