scripts_dir="$(dirname "$0")"
source "$scripts_dir/2. git - configure name of branch.sh"

if [ -z "$git_branch" ]; then
  echo 'Error: name of new branch is undefined'
  exit 1
fi

git clone "git@github.com:warren-bank/job-applicant-coding-exercises.git" "$git_branch"

cd "$git_branch"
git checkout --orphan "$git_branch"

GLOBIGNORE='.git'
rm -rf *
