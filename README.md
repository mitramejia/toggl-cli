toggl-cli
=========

A toggl cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/toggl-cli.svg)](https://npmjs.org/package/toggl-cli)
[![Downloads/week](https://img.shields.io/npm/dw/toggl-cli.svg)](https://npmjs.org/package/toggl-cli)
[![License](https://img.shields.io/npm/l/toggl-cli.svg)](https://github.com/mitramejia/https://github.com/mitramejia/toggl-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g toggl-cli
$ toggl COMMAND
running command...
$ toggl (-v|--version|version)
toggl-cli/0.0.0 darwin-x64 node-v13.12.0
$ toggl --help [COMMAND]
USAGE
  $ toggl COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`toggl current`](#toggl-current)
* [`toggl entry:start`](#toggl-entrystart)
* [`toggl entry:stop`](#toggl-entrystop)
* [`toggl help [COMMAND]`](#toggl-help-command)

## `toggl current`

Shows current entry

```
USAGE
  $ toggl current

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/current.ts](https://github.com/mitramejia/toggl-cli/issues/blob/v0.0.0/src/commands/current.ts)_

## `toggl entry:start`

Start a new time entry

```
USAGE
  $ toggl entry:start

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  toggl entry:start
```

_See code: [src/commands/entry/start.ts](https://github.com/mitramejia/toggl-cli/issues/blob/v0.0.0/src/commands/entry/start.ts)_

## `toggl entry:stop`

Stops current time entry

```
USAGE
  $ toggl entry:stop

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  toggl entry:stop
```

_See code: [src/commands/entry/stop.ts](https://github.com/mitramejia/toggl-cli/issues/blob/v0.0.0/src/commands/entry/stop.ts)_

## `toggl help [COMMAND]`

display help for toggl

```
USAGE
  $ toggl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.0.1/src/commands/help.ts)_
<!-- commandsstop -->
