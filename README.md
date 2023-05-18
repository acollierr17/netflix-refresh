# Netflix Refresh

Welcome to the Netflix Refresh repository. This application checks the Netflix API every 24 hours for newly added and deleted content in the United States. Once it has that content, it posts to the Twitter account [@NetflixRefresh](https://twitter.com/NetflixRefresh), where people can get Netflix content news in their Twitter feed.

## Tech Stack

Netflix Refresh is built with the [T3 stack](https://create.t3.gg/):

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

In addition to the T3 Stack, Netflix Refresh uses the [Twitter API](https://developer.twitter.com/en/docs/twitter-api) to post updates to Twitter and the [uNoGS API](https://rapidapi.com/unogs/api/unogs) to fetch content information from its database. We also make use of [Upstash](https://upstash.com) to handle cron jobs and caching with Redis.

## Current Features

- **Regular Updates:** The application regularly checks for newly added and deleted content on Netflix.
- **Twitter Updates:** All updates are posted to our Twitter account, [@NetflixRefresh](https://twitter.com/NetflixRefresh).

## Planned Features

- **Watchlists:** The ability to create, share, and manage watchlists. You can add shows you want to watch or build lists with friends with the ability to share lists.
- **Content History:** The ability to view a page with the current day and previous days' information on titles that were added and deleted.
- **Title Search:** The ability to search titles and open them in Netflix when you find something you want to watch.

## Contributing

We welcome contributions of all kinds from anyone. Being an open-source project, they are greatly appreciated. Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This application wouldn't be possible without the uNoGS API, the Twitter API, and the T3 Stack. Thank you to all the developers and contributors who maintain these resources.

## Contact

For any questions, feel free to reach out to us or raise an issue. We'll do our best to address your concerns promptly.

Enjoy your time with Netflix Refresh!
