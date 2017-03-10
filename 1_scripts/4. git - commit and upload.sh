scripts_dir="$(dirname "$0")"
source "$scripts_dir/2. git - configure name of branch.sh"

if [ -z "$git_branch" ]; then
  echo 'Error: name of new branch is undefined'
  exit 1
fi

cd "$git_branch"

git add --all .
git commit -m "new coding exercise: '$git_branch'"
git push -u origin "$git_branch"
