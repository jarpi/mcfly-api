# mcfly-api

[![Build Status](https://travis-ci.org/jarpi/mcfly-api.svg?branch=master)](https://travis-ci.org/jarpi/mcfly-api)
[![codecov](https://codecov.io/gh/jarpi/mcfly-api/branch/master/graph/badge.svg)](https://codecov.io/gh/jarpi/mcfly-api)

## Constraints:
	- User should be able to call the api
	- User should be able to create a note
	- User should be able to retrieve a single note (detail)
	- User should be able to retrieve all notes
	- User should be able to set a note as favorite
	- User should be able to retrieve favorite notes

## TODO
	- Improve search by boolean field efficiency, now is using a table scan (probably using a relation collection)
	- Add users, each user should have his own notes
	- Add authentication
	- Add functional tests
	- Improve view error handling (then()...catch())
