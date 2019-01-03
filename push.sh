#!/bin/bash  
git add .  
read -p "Commit description: " desc  
git commit -m "$desc" 
read -p "branch name:( if master Enter ) " branch 
branch=${branch:-master}
git push origin "$branch"




