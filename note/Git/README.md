# GIT的内部原理

## 信息存储
1. 主要数据存在``.git/objects/`` 目录下, object的类型分别有:
    - 整个文件内容(二进制) - blob
    - 提交信息 - commit
    - 哈希树(有向无环图) - tree
    - 标记 - tag

2. HEAD指针和分支数据
    - HEAD指针
        ```
        $ cat .git/HEAD
        ref: refs/heads/master
        ```
    - 分支
        ```
        $ cat .git/refs/heads/master
        0c96bfc59d0f02317d002ebbf8318f46c7e47ab2
        # 这里的SHA1的值又对应 .git/objects 上的 commit 的值
        ```

## 提交流程
1. 根据当前的暂存区的索引, 生成一个``tree object``, 作为新提交的一个快照
2. 创建一个新的``commit object``, 将这次commit的信息储存起来, 并且把parent指向上一个commit, 组成一条链
3. 将master分支的指针移到新的commit节点

# 记录GIT常用命令
> 超棒的可视化的[git模拟工具](https://learngitbranching.js.org/)
## 更新提交
```
$ git pull <repository>       # 获取分支更新并自动merge
$ git fetch <repository>      # 获取所有分支的更新, 仅更新origin那部分(origin/master)
$ git rebase newbase [branch] # 把newbase当做branch[HEAD]的父节点, 原来的分支会废弃,从X分支继续延续下去, (变基)
$ git merge branch_X          # 把X分支合并到当前分支中,并生成新的节点

$ git push <repository>       # 把本地产库的修改提交到repository
$ git push origin foo:master  # 把本地foo分支提交到远程仓库的master分支
$ git push origin :foo        # 删除远程仓库foo分支

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
$ git cherry-pick <commit_hash>     # 从其他分支提取某个commit添加进当前分支
$ git rebase -i [branchX]           # 把当前分支变基到X分支, 结合checkout和merge,可以把提交内容转移到X分支上
$ git rebase newbase [branch]       # 把newbase当做branch[HEAD]的父节点, 原来的分支会废弃,从newbase分支继续延续下去, (变基: 使原来的基点改为newbase)
$ git rebase -i newbase [branch]    # -i 参数 可以把branch[HEAD]所在的分支的提交重排,然后再重新基于newbase生成分支

$ git branch -f [branchX] commit    # 在X分支的节点强制指到commit上
$ git branch -m [new_branch]        # 把当前分支重命名
$ git branch -d [branch]            # 删除本地分支
$ git push origin --delete [branch] # 删除远程分支

$ git ls-remote --head              # 查看远程仓库中目前存在的分支
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
$ git remote add [<options>] <name> <url>   # 添加远程仓库, name通常为origin
```

## 删除

```
$ git rm -r --cached node_modules       # 移除git对node_modules的记录
```

## 配置信息

```
$ git config -l       # 查看全部信息
$ git config --global user.name [newName]        # 查看/修改信息

```

# GitFlow相关流程

## review远程功能分支的代码
```sh
## step1. 请求远程功能feature分支的代码
$ git fetch origin
$ git checkout -b feature origin/feature
## step2. 检查本地的feature 的代码
## step3. 把feature的代码合并到本地master
$ git fetch origin
$ git checkout origin/master
$ git merge --no-ff feature
## step4. 推送master代码到远端
$ git push origin master
```

## 回退的好帮手 revert 和 cherry-pick
1. 有时候错误合并了分支， 可以使用 revert 命令来撤销合并，撤销后创建一个新的提交
```sh
# 1和2代表什么？如果是把feature merge 到 master，那么1代表master，2代表feature，所以该操作是保留master分支的修改， 而撤销feature分支合并过来的修改
$ git revert -m 1 commit_id

```
2. 有时候撤销分支合并之后，需要把我们的功能提交到新的分支中，可以使用 cherry-pick 来选择

# GitHub 

#### Actions
GitHub自带的'travis CI'  
http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html  

可以直接使用别人已经写好的actions:  [actions市场](https://github.com/marketplace?type=actions)
#### gh-pages
把gh-pages分支上的作为静态内容访问.  
地址: Github用户名.github.io/创建的仓库名

```
# 提交某个目录
$ git subtree push --prefix=dist origin gh-pages

# 提交整个项目

$ git symbolic-ref HEAD refs/heads/gh-pages
$ git add -A
$ git commit -m "..."
$ git push origin gh-pages
```
## 参考

[Git知识总览](https://www.cnblogs.com/ludashi/category/1141984.html)
[这才是真正的GIT——GIT内部原理](https://www.lzane.com/tech/git-internal/)
[这才是真正的GIT——分支合并](https://www.lzane.com/tech/git-merge/)
[这才是真正的GIT——GIT实用技巧](https://www.lzane.com/tech/git-tips/)