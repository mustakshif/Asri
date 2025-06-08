const { execSync } = require("child_process");
const readline = require("readline");

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
      console.log(`\n你选择了标签：${selectedTag}`);

      rl.question("确认要删除这个标签吗？(y/n) ", (confirm) => {
        if (confirm.toLowerCase() === "y") {
          deleteTag(selectedTag);
        } else {
          console.log("已取消删除");
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
