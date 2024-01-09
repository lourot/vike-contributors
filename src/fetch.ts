import fetch from "node-fetch";

main();

type Contributors = Map<string /* username */, number /* of contributions */>;

async function main() {
  const repos = await getRepos("vikejs");
  const contributors: Contributors = new Map();
  for (const repo of repos) {
    const repoContributors = await getContributors(repo);
    for (const contributor of repoContributors) {
      contributors.set(
        contributor.login,
        (contributors.get(contributor.login) || 0) + contributor.contributions
      );
    }
  }

  // Sort by number of contributions:
  const sortedContributors = [...contributors.entries()].sort(
    (a, b) => b[1] - a[1]
  );

  console.log(
    JSON.stringify(
      {
        contributors: sortedContributors.map((contributor) => {
          return {
            login: contributor[0],
            contributions: contributor[1],
          };
        }),
      },
      null,
      2
    )
  );
}

type Repo = {
  contributors_url: string;
};

async function getRepos(org: string): Promise<Repo[]> {
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

type Contributor = {
  login: string;
  contributions: number;
};

async function getContributors(repo: Repo): Promise<Contributor[]> {
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
