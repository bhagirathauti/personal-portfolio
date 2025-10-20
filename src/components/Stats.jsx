import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

// NOTE: You provided these endpoints/credentials in the request.
// Storing tokens in source is insecure for production. Keep them here only because you explicitly provided them.
const LEETCODE_STATS_URL = 'https://leetcode-stats-api.herokuapp.com/bhagirathauti';
const GITHUB_USERNAME = 'bhagirathauti';

const Stats = () => {
  const [leet, setLeet] = useState(null);
  const [github, setGithub] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    // Fetch LeetCode stats (public API)
    fetch(LEETCODE_STATS_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setLeet(data);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('LeetCode fetch error', err);
        setError((e) => (e ? e + '\nLeetCode fetch failed' : 'LeetCode fetch failed'));
      });

    // Fetch GitHub summary via serverless endpoint to avoid exposing PAT in client bundle
    fetch(`/api/stats?login=${encodeURIComponent(GITHUB_USERNAME)}`)
      .then((r) => r.json())
      .then((payload) => {
        if (!mounted) return;
        if (payload.error) {
          console.error('GitHub API error', payload.error);
          setError((e) => (e ? e + '\nGitHub fetch failed' : 'GitHub fetch failed'));
          return;
        }
        setGithub(payload.user);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('GitHub fetch error', err);
        setError((e) => (e ? e + '\nGitHub fetch failed' : 'GitHub fetch failed'));
      });
  }, []);

  return (
    <section id="stats" className="py-16 bg-white dark:bg-transparent rounded-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white inline-block">
            <span className="relative z-10">Stats</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 dark:bg-cyan-100 opacity-20 rounded" />
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-700 dark:text-cyan-100 max-w-2xl mx-auto">Important coding and GitHub statistics.</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400">Some stats failed to load. Check console for details.</div>
        )}

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* LeetCode Card */}
          <div className="relative bg-white dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 border-[2px] border-blue-500/10 p-3 sm:p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden">
            <div className="absolute -right-12 -top-12 w-20 h-20 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300" />
            <div className="absolute -left-16 -bottom-16 w-28 h-28 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500" />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-blue-500">
                    <SiLeetcode className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-cyan-100">LeetCode</h4>
                    <p className="text-xs text-gray-500">Coding problems & ranking</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {!leet ? (
                  <div className="w-24 h-8 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                ) : (
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{leet.totalSolved ?? '0'}</div>
                )}
                <div className="text-xs text-gray-500 mt-1">problems solved</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <StatTile label="Ranking" value={!leet ? '—' : (leet.ranking ?? 'N/A')} />
              <StatTile label="Easy" value={!leet ? '—' : (leet.easySolved ?? 0)} />
              <StatTile label="Medium" value={!leet ? '—' : (leet.mediumSolved ?? 0)} />
              <StatTile label="Hard" value={!leet ? '—' : (leet.hardSolved ?? 0)} />
            </div>

            <div className="mt-4">
              <small className="text-xs text-gray-500">LeetCode activity</small>
              <div className="mt-2">
                <LeetCodeHeatmap data={leet} />
              </div>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="relative bg-white dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 border-[2px] border-blue-500/10 p-3 sm:p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden">
            <div className="absolute -right-12 -top-12 w-20 h-20 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300" />
            <div className="absolute -left-16 -bottom-16 w-28 h-28 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 text-blue-500">
                  <FaGithub className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-cyan-100">GitHub</h4>
                  <p className="text-xs text-gray-500">Repository activity & followers</p>
                </div>
              </div>

              <div className="text-right">
                {!github ? (
                  <div className="w-24 h-8 bg-gray-200 dark:bg-slate-700 rounded-md animate-pulse" />
                ) : (
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{github.repositories?.totalCount ?? 0}</div>
                )}
                <div className="text-xs text-gray-500 mt-1">public repos</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <StatTile label="Followers" value={!github ? '—' : (github.followers?.totalCount ?? 0)} />
              <StatTile label="Following" value={!github ? '—' : (github.following?.totalCount ?? 0)} />
              <StatTile label="Contribs (Yr)" value={!github ? '—' : (github.contributionsCollection?.contributionCalendar?.totalContributions ?? 'N/A')} />
            </div>

            <div className="mt-4">
              <small className="text-xs text-gray-500">GitHub contributions (weekly)</small>
              <div className="mt-2">
                <GitHubHeatmap data={github?.contributionsCollection?.contributionCalendar?.weeks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;


// Small presentational tile used inside the stats cards
function StatTile({ label, value }) {
  return (
    <div className="p-3 rounded-md bg-white dark:bg-transparent border-[1px] border-blue-500/10 text-center">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}

// Simple GitHub heatmap: expects weeks -> contributionDays[] with {date, contributionCount}
function GitHubHeatmap({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) return <div className="text-xs text-gray-400">No data</div>;

  // Flatten contributionDays into columns by week
  const weeks = data.map((w) => w.contributionDays.map((d) => d.contributionCount));
  // Determine max for coloring
  const max = Math.max(...weeks.flat(), 1);

  return (
    <div className="flex gap-1">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((count, di) => {
            const intensity = Math.round((count / max) * 4); // 0..4
            const bg = ['bg-gray-100', 'bg-blue-100', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700'][intensity];
            return <div key={di} className={`${bg} w-3 h-3 rounded-sm`} title={`${count} contributions`} />;
          })}
        </div>
      ))}
    </div>
  );
}

// LeetCode heatmap: many public endpoints don't include calendar; try to read known shapes
function LeetCodeHeatmap({ data }) {
  if (!data) return <div className="text-xs text-gray-400">Not available</div>;
  // some LeetCode endpoints include `calendar` as { totalSolvedPerDay: { '2024-01-01': 2, ... } }
  const calendar = data.calendar || data.totalSolvedPerDay || null;
  if (!calendar) return <div className="text-xs text-gray-400">Not available</div>;

  // Convert object to array of counts for a simple single-row mini-heatmap
  const entries = Object.entries(calendar).slice(-70); // last 10 weeks
  if (entries.length === 0) return <div className="text-xs text-gray-400">No data</div>;
  const counts = entries.map(([, v]) => Number(v || 0));
  const max = Math.max(...counts, 1);

  return (
    <div className="flex gap-1">
      {counts.map((c, i) => {
        const intensity = Math.round((c / max) * 4);
        const bg = ['bg-gray-100', 'bg-blue-100', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700'][intensity];
        return <div key={i} className={`${bg} w-3 h-3 rounded-sm`} title={`${c} solved`} />;
      })}
    </div>
  );
}
