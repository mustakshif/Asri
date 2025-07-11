const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 检查 git 配置
const checkGitConfig = () => {
  try {
    // 检查用户配置
    execSync('git config user.name', { stdio: 'ignore' });
    execSync('git config user.email', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('Git 配置不完整，请先设置：');
    console.error('git config --global user.name "你的名字"');
    console.error('git config --global user.email "你的邮箱"');
    return false;
  }
};

// 比较版本号
const compareVersions = (v1, v2) => {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  // 支持最多4位版本号，不足的部分用0补齐
  const maxLength = Math.max(parts1.length, parts2.length, 4);
  
  for (let i = 0; i < maxLength; i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  return 0;
};

// 提取更新日志内容
const extractChangelogContent = (changelog, version) => {
  // 匹配指定版本的更新日志部分
  const regex = new RegExp(`### v${version}\\n\\n([\\s\\S]*?)(?=\\n\\n---|$)`);
  const match = changelog.match(regex);

  if (!match) {
    return `release v${version}`;
  }

  // 提取内容并清理
  let content = match[1].trim();

  // 移除末尾的 <br /> 标记
  content = content.replace(/<br \/>\n?/g, '\n');

  return content;
};

// 检查版本
const checkVersion = () => {
  // 读取文件内容
  const changelog = fs.readFileSync(path.join(__dirname, "../CHANGELOG.md"), "utf8");
  const themeJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../theme.json"), "utf8"));

  // 从 CHANGELOG.md 中提取最新版本号，支持3位或4位版本号
  const versionMatch = changelog.match(/### v(\d+\.\d+\.\d+(?:\.\d+)?)/);
  if (!versionMatch) {
    console.error("无法从 CHANGELOG.md 中提取版本号");
    process.exit(1);
  }

  const changelogVersion = versionMatch[1];
  const currentVersion = themeJson.version;

  const needsUpdate = compareVersions(changelogVersion, currentVersion) > 0;

  if (!needsUpdate) {
    console.log(`版本已是最新：${currentVersion}`);
    process.exit(0);
  }

  return {
    version: changelogVersion,
    changelog: changelog,
  };
};

// 执行发布
const doRelease = (versionInfo) => {
  // 检查 git 配置
  if (!checkGitConfig()) {
    process.exit(1);
  }

  const themeJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../theme.json"), "utf8"));
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));

  // 更新 theme.json
  themeJson.version = versionInfo.version;
  fs.writeFileSync(path.join(__dirname, "../theme.json"), JSON.stringify(themeJson, null, 2));

  // 更新 package.json
  packageJson.version = versionInfo.version;
  fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(packageJson, null, 2));

  try {
    // 添加所有更改
    execSync('git add .');
    execSync(`git commit -m "release v${versionInfo.version}"`);
    
    // 创建并推送标签
    execSync(`git tag v${versionInfo.version}`);
    execSync('git push origin HEAD');
    execSync(`git push origin v${versionInfo.version}`);
    
    console.log(`成功发布版本 v${versionInfo.version}`);
    console.log('GitHub Release 将在推送标签后自动创建');
  } catch (error) {
    console.error('发布过程中出错：', error.message);
    process.exit(1);
  }
};

// 主流程
const main = async () => {
  try {
    const versionInfo = checkVersion();
    console.log(`检测到新版本：${versionInfo.version}`);
    console.log("\n更新日志内容：");
    console.log("-------------------");
    console.log(extractChangelogContent(versionInfo.changelog, versionInfo.version));
    console.log("-------------------\n");

    rl.question("是否继续执行发布步骤？(y/n) ", (answer) => {
      if (answer.toLowerCase() === "y") {
        doRelease(versionInfo);
      } else {
        console.log("已取消发布");
      }
      rl.close();
    });
  } catch (error) {
    console.error("执行过程中出错：", error.message);
    process.exit(1);
  }
};

main();
