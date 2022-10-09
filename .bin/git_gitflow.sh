#!/bin/bash -l

B_MASTER="master"
B_DEVELOP="develop"

# #################################
# Private Methods
# #################################

function check_remote_branch {
    branch=$(git branch -r --list origin/$1)
    if [[ -z ${branch} ]]; then
        echo "Fatal, no $1 branch in remote, please contact with the administrator."
        return 1
    else
      git checkout -b $1 origin/$1
    fi
    return 0
}

function check_local_branch {
    branch=$(git branch --list $1)
    if [[ -z ${branch} ]]; then
      return 1
    fi
    return 0
}

function check_branch {
    check_local_branch $1
    if [[ $? -ne 0 ]]; then
      check_remote_branch $1
    fi
    return 0
}

function checkout_if_exists {
    check_local_branch $1
    if [[ $? -eq 0 ]]; then
        echo "Checkout to the exists branch $1"
        git checkout $1
    else 
        check_remote_branch $1
    fi
    return $?
}

function verify_gitflow_type {
    if [[ -z $1 ]]; then
        echo "Fatal, should specify the git flow type (feature, bugfix, release or hotfix)"
        return 1
    fi
    return 0
}  


# #################################
# Public Methods
# #################################

function status {
    echo "Showing git flow status."
    git flow version
    git flow config 2>/dev/null
    if [[ $? -ne 0 ]]; then
        echo "Fatal, gitflow is not initialized, please run '$PROGRAM init'"
        exit 1
    fi
    return 0
}

function init {
    echo "Initializing git flow..."
    git flow config 1>/dev/null 2>/dev/null
    if [[ $? -eq 0 ]]; then
      echo "Warn, gitflow was initialized previously, please run '$PROGRAM reconfigure' to reconfigure"
      exit 1
    fi
    check_branch ${B_DEVELOP}
    if [[ $? -ne 0 ]]; then
      exit 2
    fi
    check_branch ${B_MASTER}
    if [[ $? -ne 0 ]]; then
      exit 3
    fi
    git flow init -d
    reconfigure
    git checkout ${B_DEVELOP}
    return 0
}

function reconfigure {
    git config gitflow.prefix.feature feature/#
    git config gitflow.prefix.bugfix bugfix/#
    git config gitflow.prefix.release release/#
    git config gitflow.prefix.hotfix hotfix/#
    git config gitflow.prefix.support support/#
    git config gitflow.prefix.versiontag v
    git config gitflow.hotfix.finish.message "Hotfix "
    git config gitflow.release.finish.message "Release "
}

function start {
    verify_gitflow_type $1
    if [[ -z $2 ]]; then 
        echo "Fatal, should specify the git branch name"
        exit 1    
    fi
    git flow $1 start $2
    if [[ $? -ne 0 ]]; then 
      checkout_if_exists "$1/#$2"
    fi
    return $?
}

function finish {
    git flow finish >.__tmpoutput 2>/dev/null
    if [[ $? -ne 0 ]]; then
        echo "Fatal, gitflow has no one branch started, please run '$program start --type-- --branch name--'"
        rm .__tmpoutput
        return 1
    fi
    cat .__tmpoutput
    rm .__tmpoutput
    return 0
}

function push {
    git push --all origin
    git push --tags
    return $?
}

function destroy {
    git config --remove-section "gitflow.path"
    git config --remove-section "gitflow.prefix"
    git config --remove-section "gitflow.branch"
    return $?
  }

function help {
    echo "-"
    echo "Usage: $PROGRAM --option--"
    echo "-"
    echo "Options available:"
    echo "       init                            Init git flow configuration."
    echo "       status                          Showing gitflow version and status."
    echo "       reconfigure                     Reconfigure git flow parameters."
    echo "       start --type-- --branch name--  Start new git flow branch with specific name."
    echo "       finish                          Stop active branch."
    echo "       push                            Push all pending commits to origin"
    echo "       destroy                         Destroy git flow configuration."
    echo "-"
    echo "  Extra Options:"
    echo "       -dir <directory>                Specify the subproject folder where exec the git flow commands."
    echo "       -h --help                       Show help message."
    echo "-"
    echo "Samples:"
    echo "          $PROGRAM reconfigure"
    echo "          $PROGRAM start bugfix 3.2.6"
    echo "          $PROGRAM -dir subproject/ start bugfix 3.2.6"
    echo "-"
}

# #################################
# Main
# #################################

## Analizing Arguments
POSITIONAL=()
while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    -dir)
      SUBPROJECT="$2"
      shift # past value
      shift # past value
    ;;
    -h|--help)
      help
      exit 0
    ;;
    *)    # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      shift # past argument
    ;;
  esac
done
set -- "${POSITIONAL[@]}"
#####

## Validate execution
PROGRAM=$0
if [ "$#" -eq 0 ]; then
  help
  exit 0
fi
#####

## Call function user selected
if [ ! -z $SUBPROJECT ]; then
  if [ -d $SUBPROJECT ]; then
    cd $SUBPROJECT
  else
    echo "The subproject $SUBPROJECT does not exists, please try with other one."
    exit 1
  fi
else
  echo "Executing git flow process in current dir."
fi
case $1 in
  init)
    init
    ;;
  status)
    status
    ;;
  reconfigure)
    reconfigure
    ;;
  start)
    start ${@:2}
    ;;
  finish)
    finish
    ;;
  push)
    push
    ;;
  destroy)
    destroy
    ;;
  *)
    help
    ;;
esac
#####

exit 0