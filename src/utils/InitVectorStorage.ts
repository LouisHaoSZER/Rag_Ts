import { readFileSync } from 'node:fs'
import { AlibabaTongyiEmbeddings } from '@langchain/community/embeddings/alibaba_tongyi'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { glob } from 'glob'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { USER_CONFIG } from '../../config.js'

(async () => {
  try {
    // 读取文件 构造成为文件数组
    const data: string[] = []
    // 注意这里的路径是相对于项目根目录的，如果没有文件读的话会报错 An error occurred: Error: Vector store not initialised yet. Try calling `fromTexts`, `fromDocuments` or `fromIndex` first.
    const files = await glob(USER_CONFIG.FAISSSTORE_CONFIGURATION.TRAINS_MD_FILES)

    // 读取文件内容 并添加到data数组中
    for (const file of files) {
      data.push(readFileSync(file, 'utf-8'))
    }
    // eslint-disable-next-line no-console
    console.log(`Add ${data.length} files into data. Splitting data into chunks...`)

    // 分割器
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1024,
      chunkOverlap: 25,
      separator: '/n',
    })

    let docs: string[] = []

    for (const text of data) {
      const docOutput = await textSplitter.splitText(text) as string[]
      docs = [...docs, ...docOutput]
    }

    // 生成metadata 用于存储文档chunks的id
    // const metadata = docs.map((_, i) => ({ id: i }))
    // eslint-disable-next-line no-console
    console.log('Splitting complete. Initializing OpenAIEmbeddings...')

    // const embeddings = new OpenAIEmbeddings()
    const model = new AlibabaTongyiEmbeddings({
      modelName: USER_CONFIG.EMBEDDINGS.MODEL_NAME as 'text-embedding-v2',
      apiKey: USER_CONFIG.EMBEDDINGS.MODEL_API_KEY,
      batchSize: USER_CONFIG.EMBEDDINGS.MODEL_BATCH_SIZE,
      stripNewLines: USER_CONFIG.EMBEDDINGS.MODEL_STRIP_NEW_LINES,
      parameters: USER_CONFIG.EMBEDDINGS.MODEL_PARAMETERS,
    })

    // eslint-disable-next-line no-console
    console.log('Initializing FaissLibArgs...')
    const store = await FaissStore.fromTexts(
      docs,
      docs.map((_, i) => ({ id: i })),
      model,
    )
    // eslint-disable-next-line no-console
    console.log('Saving VectorStorage...')
    // await vectorStore.save('src/trains/vectorstorage')
    store.save('src/trains/vectorstorage')
    // eslint-disable-next-line no-console
    console.log('VectorStorage saved.')
  // }
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
})()
