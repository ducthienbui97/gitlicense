# Git License
[![GitLicense](https://gitlicense.com/ducthienbui97/gitlicense/badge)](https://gitlicense.com/ducthienbui97/gitlicense/license)
[![Code Climate](https://codeclimate.com/github/ducthienbui97/gitlicense/badges/gpa.svg)](https://codeclimate.com/github/ducthienbui97/gitlicense)
[![Build Status](https://travis-ci.org/ducthienbui97/gitlicense.svg?branch=master)](https://travis-ci.org/ducthienbui97/gitlicense)
[![codecov](https://codecov.io/gh/ducthienbui97/gitlicense/branch/master/graph/badge.svg)](https://codecov.io/gh/ducthienbui97/gitlicense)

License badge for your Github repos.

## Usage

Git License give you a easy way to display license on github.
We use github license api to get license of you repo.

#### Markdown

```md
[![GitLicense](https://gitlicense.com/:user/:repo/badge)](https://gitlicense.com/:user/:repo/license)
```
#### HTML

``` html
<a href="https://gitlicense.com/:user/:repo/license">
    <img src="https://gitlicense.com/:user/:repo/badge"/>
</a>
```

#### RST

``` rest
.. image:: https://gitlicense.com/:user/:repo/badge
 :target: https://gitlicense.com/:user/:repo/license
```

If Github api can't provide your repo's license, your repo have to have a ```.gitlicense``` file with following patern in order to be recognised.

``` json
{
    "License name" : "License url"
}
```

Example can be found in [this file](.gitlicense)

## TODO
- Add more test.
- Develop front end pages.

## Credit
- [Shields.io](https://github.com/badges) for the badges
- [Hapi](https://github.com/hapijs) for server framwork
