# Git License
[![GitLicense](https://gitlicense.azurewebsites.net/ducthienbui97/gitlicense/badge)](https://gitlicense.azurewebsites.net/ducthienbui97/gitlicense/license)
[![Build Status](https://travis-ci.org/ducthienbui97/gitlicense.svg?branch=master)](https://travis-ci.org/ducthienbui97/gitlicense)
[![codecov](https://codecov.io/gh/ducthienbui97/gitlicense/branch/master/graph/badge.svg)](https://codecov.io/gh/ducthienbui97/gitlicense)

Git License give you a easy way to display license on github.
We use github license api to get license of you repo.

## Usage

#### Markdown

```md
[![GitLicense](https://gitlicense.azurewebsites.net/:user/:repo/badge)](https://gitlicense.azurewebsites.net/:user/:repo/license)
```
#### HTML

``` html
<a href="https://gitlicense.azurewebsites.net/:user/:repo/license">
    <img src="https://gitlicense.azurewebsites.net/:user/:repo/badge"/>
</a>
```

#### RST

``` rest
.. image:: https://gitlicense.azurewebsites.net/:user/:repo/badge
 :target: https://gitlicense.azurewebsites.net/:user/:repo/license
```

If Github api can't provide your repo's license, your repo have to have a ```.gitlicense``` file with following patern in order to be recognised.

``` json
{
    "License name" : "License url"
}
```

Example can be found in [this file](.gitlicense)

## TODO
- Buy a domain
- Add more test
- Frontend

## Credit
- [Shields.io](https://github.com/badges) for the badges
