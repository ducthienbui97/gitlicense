# Git License
[![GitLicense](https://gitlicense.com/badge/ducthienbui97/gitlicense)](https://gitlicense.com/license/ducthienbui97/gitlicense)
[![Code Climate](https://codeclimate.com/github/ducthienbui97/gitlicense/badges/gpa.svg)](https://codeclimate.com/github/ducthienbui97/gitlicense)
[![Build Status](https://travis-ci.org/ducthienbui97/gitlicense.svg?branch=master)](https://travis-ci.org/ducthienbui97/gitlicense)
[![codecov](https://codecov.io/gh/ducthienbui97/gitlicense/branch/master/graph/badge.svg)](https://codecov.io/gh/ducthienbui97/gitlicense)

License badge for your Github repos.

## Usage

Git License give you a easy way to display license on github.
We use github license api to get license of you repo.

#### Markdown

```md
[![GitLicense](https://gitlicense.com/badge/:user/:repo)](https://gitlicense.com/license/:user/:repo)
```
#### HTML

``` html
<a href="https://gitlicense.com/license/:user/:repo">
    <img src="https://gitlicense.com/badge/:user/:repo"/>
</a>
```

#### RST

``` rest
.. image:: https://gitlicense.com/badge/:user/:repo
 :target: https://gitlicense.com/license/:user/:repo
```

If Github api can't provide your repo's license, your repo have to have a ```.gitlicense``` file with following patern in order to be recognised.

``` json
{
    "license" : "License name",
    "url" : "License url"
}
```

Example can be found in [this file](.gitlicense)

## Todo
- Add more test.

## Credit
- [Shields.io](https://github.com/badges) for the badges
- [Hapi](https://github.com/hapijs) for server framwork
