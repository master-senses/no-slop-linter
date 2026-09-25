After making changes, run `npm run lint` and fix all errors.

`examples/fail` is supposed to violate the rules. Do not "fix" those files to make `npm run lint:fail` pass. Use `npm run check:examples` to confirm the fail fixtures still report the expected rules.

The no-slop source of truth is `tools/oxlint/anti-slop`, not leftover skill files.
