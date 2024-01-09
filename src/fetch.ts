import fetch from "node-fetch";

main();

async function main() {
  const repos = await getRepos("vikejs");
  for (const repo of repos) {
    const contributors = await getContributors(repo);
    console.log(contributors.length);
  }
}

type GithubRepo = {
  contributors_url: string;
};

async function getRepos(org: string): Promise<GithubRepo[]> {
  const repos = await fetchArray(`https://api.github.com/orgs/${org}/repos`);
  return repos.filter(
    (repo: any) =>
      !repo.private &&
      !repo.fork &&
      !repo.archived &&
      !repo.disabled &&
      !repo.is_template
  );
}

async function getContributors(repo: GithubRepo) {
  return await fetchArray(repo.contributors_url);
}

async function fetchArray(url: string): Promise<any[]> {
  const result: any[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(url + "?per_page=100&page=" + page);
    const json = (await res.json()) as any;
    result.push(...json);
    if (json.length < 100) {
      break; // that was the last page
    }
    ++page;
    if (page > 10) {
      throw new Error("too many pages");
    }
  }
  return result;
}
