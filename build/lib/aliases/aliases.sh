#!/bin/bash
#
# Lascivia Aliases
#
# You need two things to use these aliases. 
#
# In your profile file (e.g., .bashrc), you need to 
# 	1) export a variable named LASCIVIA_PROJECT_ROOT that points to the project root, and
# 	2) source this file.
#
# For example,
#
# export LASCIVIA_PROJECT_ROOT="/Users/curt/dev/lascivia/pc_dev"
# source "$LASCIVIA_PROJECT_ROOT/aliases.sh"
#

export RELATIVE_PATH_TO_ROOT_PROJECT="../../.."

export TEST_REPORT_PATH="$LASCIVIA_PROJECT_ROOT/test/results"
export TEST_REPORT_FILENAME='test-report.all.xml'
export ASAR_FILE='asar-contents.txt'

alias cdgame='cd $LASCIVIA_PROJECT_ROOT'
alias clean='cdgame && npm run clean'
alias hot='cdgame && npm run hot'
alias game="open -a $LASCIVIA_PROJECT_ROOT/build/pack/Lascivia-darwin-x64/Lascivia.app"
alias pack='cdgame && npm run package'
alias dev='cdgame && npm run dev'
alias prod='cdgame && npm run prod'
alias test='cdgame && npm run test:all'
alias test-unit='cdgame && npm run test:unit'
alias test-dom='cdgame && npm run test:dom'
alias clean='cdgame && npm run clean'
alias fork='cdgame && npm run fork -- --config=./conf/fork.config.js'
alias list='cdgame && npm run list'