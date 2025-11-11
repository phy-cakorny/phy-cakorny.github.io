import { useEffect, useState } from "react";

export default function GithubProjects({ username = "your-username", max = 20 }) {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    PHP: "#4F5D95",
    Ruby: "#701516",
  };

  useEffect(() => {
    let mounted = true;
    const cacheKey = `gh-repos-${username}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setRepos(parsed);
        setLoading(false);
      } catch (_e) {}
    }

    const url = `https://api.github.com/users/${username}/repos?per_page=${max}&sort=updated`;

    (async () => {
      try {
        const headers = token ? { Authorization: `token ${token}` } : {};
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        if (!mounted) return;

        setRepos(filtered);
        setLoading(false);
        localStorage.setItem(cacheKey, JSON.stringify(filtered));
        setTimeout(() => localStorage.removeItem(cacheKey), 5 * 60 * 1000);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [username, max, token]);

  // UI states
  if (loading) return <div>Loading projects…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!repos || repos.length === 0) return <div>No projects found.</div>;

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => {
        const demoUrl =
          repo.homepage && repo.homepage.trim().length > 0
            ? repo.homepage
            : `https://github.com/${username}/${repo.name}/`;

        const langColor = languageColors[repo.language] || "#9CA3AF"; // gray fallback

        return (
          <li
            key={repo.id}
            className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={repo.owner?.avatar_url}
                  alt={`${username} avatar`}
                  className="w-8 h-8 rounded-full border"
                />
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold hover:text-sky-600 transition-colors"
                >
                  {repo.name}
                </a>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {repo.description || "No description provided."}
              </p>

              {/* Meta info */}
              <div className="text-xs text-gray-500 flex flex-wrap items-center gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: langColor }}
                  ></span>
                  {repo.language || "—"}
                </span>
                <span>⭐ {repo.stargazers_count}</span>
                <span>🕒 {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-sky-600 text-white rounded text-sm hover:bg-sky-700 transition-colors"
              >
                Live Demo
              </a>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition-colors"
              >
                Repo
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
