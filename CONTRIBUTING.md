# Contributing

Thank you for your interest in committing code back to this project!

## Conventional Commits

This repository requires your pull request title to conform to the
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard. This allows
[semantic-release](https://semantic-release.gitbook.io) to properly auto-generate a version number based on the type of
change you're submitting.

## Releasing

Merges to `main` are automatically released using [semantic-release](https://semantic-release.gitbook.io).

Certain types of commits do not trigger a release. If you use `feat:` or `fix:`, you're guaranteed to generate a new
release.

See [the docs](https://github.com/semantic-release/commit-analyzer/#releaserules) for more details.
