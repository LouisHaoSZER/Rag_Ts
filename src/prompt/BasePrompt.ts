/**
 *  基本的Prompt模板，可根据场景自行修改
 */
const basePrompt = `
请从以下Markdown格式的项目文档中提取相关信息,并基于此提供准确且详细的回答。

确保回答内容符合上下文逻辑，且与文档中的信息一致。

若有多个相关信息来源，优先选择最新或最相关的内容。

使用以下的 MemoryContext 来回答用户。ConversationHistory 是一个 Conversation 对象的列表，它对应你与用户正在进行的对话。

提示: 若文档中没有明确答案，请尽量提供有帮助的推测，或者指出可能缺失的信息。
---
ConversationHistory: {history}
---
MemoryContext: {context}
---
Human: {prompt}

Rag_Answer:`

export default basePrompt
