import { ChatAlibabaTongyi } from '@langchain/community/chat_models/alibaba_tongyi'
import { AlibabaTongyiEmbeddings } from '@langchain/community/embeddings/alibaba_tongyi'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { PromptTemplate } from 'langchain-core/prompts'
import { RunnableSequence } from 'langchain-core/runnables'
import { USER_CONFIG } from '../../YourConfig.js'
import basePrompt from '../prompt/BasePrompt.js'

// config()

let store: FaissStore | null = null

try {
  store = await FaissStore.load(USER_CONFIG.FAISSSTORE_CONFIGURATION.VECTORSTORE_ROOT, new AlibabaTongyiEmbeddings({
  // TODO: 封装配置文件
    modelName: USER_CONFIG.EMBEDDINGS.MODEL_NAME as 'text-embedding-v2',
    apiKey: USER_CONFIG.EMBEDDINGS.MODEL_API_KEY,
    batchSize: USER_CONFIG.EMBEDDINGS.MODEL_BATCH_SIZE,
    stripNewLines: USER_CONFIG.EMBEDDINGS.MODEL_STRIP_NEW_LINES,
    parameters: USER_CONFIG.EMBEDDINGS.MODEL_PARAMETERS,
  }))
}
catch (e) {
  console.error('加载 FaissStore 时出错:', e)
}

// console.clear()

// OpenAI Configuration
// const llm = new ChatOpenAI({
//   // model: USER_CONFIG.OPENAI_CONFIGURATION.MODEL,
//   // modelName: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_NAME,
//   openAIApiKey: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_API_KEY,
//   temperature: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_TEMPERATURE,
//   maxTokens: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_MAX_TOKENS,
//   configuration: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_CONFIGURATION,
// })
//

// Use qwen-plus
const qwenPlus = new ChatAlibabaTongyi({
  model: 'qwen-plus', // Available models: qwen-turbo, qwen-plus, qwen-max
  temperature: 1,
  alibabaApiKey: 'sk-b3c9367da1b5439ea3dafcd2048e38b7',
})
// 初始化prompt
const prompt = PromptTemplate.fromTemplate(basePrompt)
// const prompt = PromptTemplate.fromTemplate("Tell me a {adjective} joke");
// 初始化LLMChain
// @ts-expect-error 无法解析
const llmChain = RunnableSequence.from([prompt, qwenPlus])
// console.log('llmChain:', llmChain)
/**
 * 基于历史和prompt生成回答
 */
export async function generateResponse({
  prompt,
  history,
}: {
  prompt: string
  history: any
}): Promise<any> {
  if (!store) {
    console.error('FaissStore 未正确初始化')
    return '抱歉，系统当前无法处理您的请求。请稍后再试。'
  }

  try {
    // TODO 这里可以利用知识图谱去进行检索的优化
    const data = await store.similaritySearch('小程序', 1)
    // console.log('data:', data)

    const context = ['']
    data.forEach((item) => {
      context.push(`Context: \n${item.pageContent}`)
    })

    let answer = ''
    try {
      answer = await llmChain.invoke({
        prompt,
        context: context.join('\n\n'),
        history,
      })
    }
    catch (e) {
      console.error(e)
    }
    return answer
  }
  catch (e) {
    console.error('生成响应时出错:', e)
    return '抱歉，处理您的请求时出现了问题。请稍后再试。'
  }
}
