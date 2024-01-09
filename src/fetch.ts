import fetch from "node-fetch";

main();

async function main() {
  const repos = await getRepos("vikejs");
  console.log(repos);
}

async function getRepos(org: string) {
  const res = await fetch(`https://api.github.com/orgs/${org}/repos`);
  const json = (await res.json()) as any;
  return json.filter(
    (repo: any) =>
      !repo.private &&
      !repo.fork &&
      !repo.archived &&
      !repo.disabled &&
      !repo.is_template
  );
}
