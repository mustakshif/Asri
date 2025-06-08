const { execSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 获取最近的标签列表
const getRecentTags = () => {
  try {
    // 获取最近的5个标签，按时间倒序排列
    const tags = execSync('git tag --sort=-creatordate -l "v*" | head -n 5', { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter((tag) => tag); // 过滤空行

    return tags;
  } catch (error) {
    console.error("获取标签列表失败：", error.message);
    process.exit(1);
  }
};

// 回退版本号
const revertVersion = (prevVersion) => {
  try {
    // 更新 theme.json
    const themeJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../theme.json"), "utf8"));
    themeJson.version = prevVersion;
    fs.writeFileSync(
      path.join(__dirname, "../theme.json"),
      JSON.stringify(themeJson, null, 2)
    );

    // 更新 package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));
    packageJson.version = prevVersion;
    fs.writeFileSync(
      path.join(__dirname, "../package.json"),
      JSON.stringify(packageJson, null, 2)
    );

    console.log(`已将版本号回退到 ${prevVersion}`);
  } catch (error) {
    console.error("回退版本号失败：", error.message);
    process.exit(1);
  }
};

// 删除标签
const deleteTag = (tag) => {
  try {
    // 删除本地标签
    execSync(`git tag -d ${tag}`);
    // 删除远程标签
    execSync(`git push origin :refs/tags/${tag}`);
    console.log(`成功删除标签 ${tag}`);
  } catch (error) {
    console.error("删除标签失败：", error.message);
    process.exit(1);
  }
};

// 主流程
const main = async () => {
  try {
    const tags = getRecentTags();

    if (tags.length === 0) {
      console.log("没有找到任何标签");
      process.exit(0);
    }

    console.log("最近的标签列表：");
    tags.forEach((tag, index) => {
      console.log(`${index + 1}. ${tag}`);
    });

    rl.question("\n请选择要删除的标签编号（1-5）：", (answer) => {
      const index = parseInt(answer) - 1;

      if (isNaN(index) || index < 0 || index >= tags.length) {
        console.log("无效的选择");
        rl.close();
        return;
      }

      const selectedTag = tags[index];
      const prevVersion = tags[index + 1]?.replace('v', '') || '0.0.0';
      console.log(`\n你选择了标签：${selectedTag}`);
      console.log(`将回退到版本：${prevVersion}`);

      rl.question("确认要删除这个标签并回退版本号吗？(y/n) ", (confirm) => {
        if (confirm.toLowerCase() === "y") {
          deleteTag(selectedTag);
          revertVersion(prevVersion);
          // 提交版本号更改
          execSync('git add theme.json package.json');
          execSync(`git commit -m "revert: version to ${prevVersion}"`);
          execSync('git push origin HEAD');
          console.log('已提交版本号更改');
        } else {
          console.log("已取消操作");
        }
        rl.close();
      });
    });
  } catch (error) {
    console.error("执行过程中出错：", error.message);
    process.exit(1);
  }
};

main();
