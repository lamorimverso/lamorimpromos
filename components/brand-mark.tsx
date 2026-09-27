const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const repositoryOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repositoryName);
const isUserSite = repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath = isGitHubPagesBuild && !isUserSite ? `/${repositoryName}` : '';

export function BrandMark() {
  return (
    <a href="#topo" className="brand-mark" aria-label="LamorimPromos — início">
      <img
        src={`${basePath}/lamorimpromos-avatar.png`}
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
