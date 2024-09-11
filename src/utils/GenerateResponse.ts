import { AlibabaTongyiEmbeddings } from '@langchain/community/embeddings/alibaba_tongyi'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from 'langchain-core/prompts'
import { RunnableSequence } from 'langchain-core/runnables'
import { USER_CONFIG } from '../../YourConfig.js'
import basePrompt from '../prompt/BasePrompt.js'

// config()

let store: FaissStore

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
  console.error(e)
}

// console.clear()

// OpenAI Configuration
const llm = new ChatOpenAI({
  // model: USER_CONFIG.OPENAI_CONFIGURATION.MODEL,
  // modelName: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_NAME,
  openAIApiKey: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_API_KEY,
  temperature: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_TEMPERATURE,
  maxTokens: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_MAX_TOKENS,
  configuration: USER_CONFIG.OPENAI_CONFIGURATION.MODEL_CONFIGURATION,
})

// 初始化prompt
const prompt = PromptTemplate.fromTemplate(basePrompt)
// const prompt = PromptTemplate.fromTemplate("Tell me a {adjective} joke");
// 初始化LLMChain
// @ts-expect-error 无法解析
const llmChain = RunnableSequence.from([prompt, llm])
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
  const data = await store.similaritySearch('Human: 签到小程序开发人员有哪些？', 1)
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
