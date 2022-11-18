<p align="center">
    <a href="https://github.com/eliseobao/carggregator-web/" alt="carggregator-web">
        <img src="https://github.com/eliseobao/carggregator-web/blob/develop/images/corporate/carggregator_logo_1.svg" />
    </a>
</p>


<p align="center">
    <a href="https://github.com/eliseobao/carggregator-web/blob/develop/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/eliseobao/carggregator-web" />
    </a>
    <a href="https://github.com/eliseobao/carggregator-web/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/eliseobao/carggregator-web" />
    </a>
    <a href="https://github.com/eliseobao/carggregator-web/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/eliseobao/carggregator-web" />
    </a>
    <a href="#stars" alt="Stars">
        <img src="https://img.shields.io/github/stars/eliseobao/carggregator-web" />
    </a>
</p>


This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png

## _Your second-hand car easier than ever_


Frontend for carggregator, a second-hand car ads aggregator.

## TOC

- [Tech](#tech)
- [Development](#development)
  * [Git-Flow](#git-flow)
  * [Docker](#docker)
- [License](#license)


## Tech

carggregator-web uses a number of open source projects to work properly:

- [React] - A declarative, efficient, and flexible JavaScript library for building user interfaces.
- [Reactive Search] - Search UI components for React and Vue.


And of course carggregator-web itself is open source with a [public repository][carggregator] on GitHub.


## Development

Want to contribute? Great!


### Git-Flow

carggregator-web uses git-flow to structure its repository! Open your favorite Terminal and run these commands.

Initialize git-flow:
```sh
bash .bin/git_gitflow.sh init
```

Start a new feature:
```sh
git flow feature start Issue-X
```

Finish a feature:
```sh
git flow feature finish Issue-X
```

### Docker

Build the image:
```sh
make build
```

Deploy web:
```sh
make up
```

Stop web:
```sh
make down
```


## License

GNU General Public License v3.0



[carggregator]: <https://github.com/eliseobao/carggregator-web>
[git-repo-url]: <https://github.com/eliseobao/carggregator-web.git>

[React]: <https://github.com/facebook/react>
[Reactive Search]: <https://github.com/appbaseio/reactivesearch>
