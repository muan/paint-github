# Contributing to Shutterstock Open Source

Thanks for your interest in contributing to Shutterstock open source initiatives! We appreciate pull requests from everyone.

This document sets forth guidelines for contributing to Shutterstock open source projects on [GitHub](https://github.com/shutterstock).

These guidelines apply to all of our repos.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Contributing?](#contributing)
	- [Submitting (Good) Bug Reports](#submitting-good-bug-reports)
	- [Your First Code Contribution](#your-first-code-contribution)
- [Styleguides](#styleguides)
	- [Git Commit Messages](#git-commit-messages)
	- [Code](#code)

## Code of Conduct

All Shutterstock open source projects are governed by the [Shutterstock Code of Conduct](https://github.com/shutterstock/code-of-conduct). By contributing to our projects, you are agreeing to adhere to this code. Please report unacceptable behavior to opensource@shutterstock.com.

## Getting Started

Shutterstock is a large organization which maintains a wide array of open source projects, many of which we use to keep the Shutterstock website and our products up and operational. We don't open source projects unless we think that they might have value to the wider community, and we're interested in long-term maintenance of our packages.

## Contributing

You can contribute in many ways. You can comment on issues with your opinions, suggest labels for comment threads, review code on pull requests, suggest changes to the code by submitting your own pull requests, open issues suggesting enhancements or filing bugs, and so on. **Not all contributions need to be code related.**

#### Submitting (Good) Bug Reports

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined which repository your bug is related to, create an issue on that repository using the [issue template](issue_template.md). Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** with as much detail as possible. When listing steps, **don't just say what you did, but explain how you did it**.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

### Your First Code Contribution

Unsure where to begin contributing? You can start by checking if there are any issues in the `beginner` and `help-wanted` lists:

* [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Code

Conform to the coding style set for each repository you submit to. Each repository should have a CONTRIBUTING doc that outlines contributing information specific to that repository.

[beginner]:https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abeginner+label%3Ahelp-wanted+user%3Ashutterstock+sort%3Acomments-desc
[help-wanted]:https://github.com/issues?q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+user%3Ashutterstock+sort%3Acomments-desc+-label%3Abeginner
