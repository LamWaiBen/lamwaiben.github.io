# 记录GIT常用命令
> 超棒的可视化的[git模拟工具](https://learngitbranching.js.org/)
## 更新提交
```
$ git pull
$ git fetch
$ git rebase newbase [branch]       # 把newbase当做branch[HEAD]的父节点, 原来的分支会废弃,从X分支继续延续下去, (变基)
$ git merge branch_X          # 把X分支合并到当前分支中,并生成新的节点

$ git push

```


## 版本回退

1. 工作区回退
    ```
    $ git checkout file_xxx     # 清除暂存区的修改
    ```

2. 暂存区回退
    ```
    $ git reset --<model> [<commit>] [file_name]
    # mode:
    --soft              只把HEAD重置到指定commit, 但是暂存区以及工作区还是维持原来的HEAD的内容
    --mixed [defalut]   把HEAD和暂存区重置到指定commit,工作区不受影响 
    --hard              全部还原到指定的commit, 包括HEAD, 工作区, 暂存区,

    #HEAD~1     表示HEAD的上一个commit
    ```
3. 远程仓库版本回退
    ```
    $ git reset --hard [<commit>]
    $ git push -f origin master    # 强制推送到远程分支  git push -f <repository>
    ```


## 储藏

```
$ git stash     #保存工作区与暂存区的修改, 回到干净状态
$ git stash pop # 还原储藏的内容
$ git stash drop # 丢弃储藏的内容
```

## 分支

```
$ git cherry-pick <commit_hash> # 从其他分支提取某个commit添加进当前分支
$ git rebase -i branch_X      # 把当前分支变基到X分支, 结合checkout和merge,可以把提交内容转移到X分支上
$ git rebase newbase [branch]        # 把newbase当做branch[HEAD]的父节点, 原来的分支会废弃,从newbase分支继续延续下去, (变基: 使原来的基点改为newbase)
# $ git rebase -i newbase [branch]      -i 参数 可以把branch[HEAD]所在的分支的提交重排,然后再重新基于newbase生成分支

$ git branch -f branch_X commit # 在X分支的节点强制指到commit上
```

## 追踪
```
$ git clean -fd             # 删除未被追踪的文件
$ git rm --cached <file>    # 停止追踪指定文件
```

## 标签
```
$ git tag v1.0
```

## 锚点
```
$ git describe  <ref>       # 找出任何相关的提交记录
#返回结果  eg: v0_2_gC2         v0:距离最近的标签  2: ref与tage相差的提交记录  gC2最后的commit_hash
```

## 远程相关

```
$ ssh-keygen -f ~/.ssh/somebody             # 生成公钥密钥，如~/.ssh文件夹不存在则需要先创建
$ ssh -T git@github.com                     # 测试密钥是否能连通github
$ git clone -b <branch> <repo> [<dir>] # 克隆指定分支
$ git remote add [<options>] <name> <url>      # 添加远程仓库
```

## 配置信息

    ```
    $ git config -l       # 查看全部信息
    $ git config --global user.name [newName]        # 查看/修改信息

    ```


## 参考

[Git知识总览](https://www.cnblogs.com/ludashi/category/1141984.html)