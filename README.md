# 项目名称

这是一个用于生成对话响应的小程序，使用了 OpenAI 和 Alibaba 的 API。

## 目录

- [项目简介](#项目简介)
- [安装](#安装)
- [使用](#使用)
- [环境变量](#环境变量)
- [贡献](#贡献)
- [许可证](#许可证)

## 项目简介

该项目通过调用 OpenAI 和 Alibaba 的 API，根据用户输入生成对话响应。项目使用 TypeScript 编写，并且为了类型支持，在文件YourConfig中配置了相关环境

## 安装

1. 克隆仓库到本地：

    ```bash
    git clone git@github.com:LouisHaoSZER/Rag_Ts.git
    cd your-repo
    ```

2. 安装依赖：

    ```bash
    pnpm install
    ```

## 使用

1. 确保已经配置好环境变量。
2. 运行项目：

    ```bash
    pnpm build ##构建本地向量数据文件
    pnpm start ## 启动一次性对话
    ```

3. 项目会根据文件 index.ts 的question变量的内容生成响应，并输出到控制台。目前暂无对格式化输出的支持，后续会更新以控制台对话的形式输出输入输出。

## 环境配置

要配置此项目的环境，请在位于 项目根目录下 的 `config.ts` 文件中更新以下设置：

### Embeddings 配置

对于嵌入，确保设置以下参数：

- `MODEL_NAME`：文本嵌入模型的名称。
- `MODEL_API_KEY`：访问文本嵌入模型的 API 密钥。
- `MODEL_BATCH_SIZE`：处理嵌入的批量大小。
- `MODEL_STRIP_NEW_LINES`：是否从输入文本中去除换行符。
- `MODEL_PARAMETERS`：文本嵌入模型的其他参数。

### FaissStore 配置

要配置 FaissStore，请更新以下设置：

- `VECTORSTORE_ROOT`：向量存储的根目录。
- `TRAINS_MD_FILES`：用于训练的 Markdown 文件的路径。

### OpenAI 配置

对于 OpenAI 集成，请修改以下设置：

- `MODEL`：用于 OpenAI 的模型。
- `MODEL_NAME`：OpenAI 文本模型的名称。
- `MODEL_API_KEY`：访问 OpenAI 模型的 API 密钥。
- `MODEL_TEMPERATURE`：生成文本的温度参数。
- `MODEL_MAX_TOKENS`：生成文本的最大令牌数。
- `MODEL_CONFIGURATION`：OpenAI 模型的其他配置。

根据您的特定环境和要求更新这些设置。

## 贡献

欢迎贡献！请 fork 该仓库并提交 pull request。

## 许可证

该项目使用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
