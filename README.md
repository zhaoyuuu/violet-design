# 💖 Hello, violetUI

## 🍇 git 流程

1. 将需求拆分至**更小**的模块, 同时也尽可能不损失清晰的语义, 避免多人提交代码时的冲突
2. 在 `local repository` 中通过 `git checkout -b <BRANCHNAME> origion/master` 创建分支, 并将需求提交至分支
3. `git commit` 提交代码, commit 信息尽量遵循 [conventioanl commits](https://www.conventionalcommits.org/en/v1.0.0/), 如果有 `lint` 错误, 修复之后进行下一步
4. `git push origion <BRANCHNAME>` 提交代码至远程仓库
5. 在 github 上发起 `pull request` , 将当前 branch 合并至 **`master`** 分支
6. 一般的，提交完代码之后删除分支（除非该分支之后还要使用）。删除远程分支：`git push origion --delete remoteBranchName`(origion 即 https://github.com/zhaoyuuu/violetUI.git)

## 🍸 组件录入流程

1. 开始一个组件时，如果需要用自定义方式非常规完成`react`或`html`自带的`tag`（input,form,scrollBar...）以及完成一些复杂动画效果时，需要与其他队员充分的沟通。一定要确认：
   - 是否为最佳实现方式
   - 是否可以完全完成原有组件的所有功能，并将这些功能完全跟设计人员对比
   - 设想一定使用场景，避免冲突，总之尽量慎重一点，此时的设计是可修改的
2. 组件实现之后，编写**单元测试**，通过单元测试后再提交`pr`
3. `code review`：提交代码，需要 lead engineer 代码评审, 再合并到 `master branch` 上
