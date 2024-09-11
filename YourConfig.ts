export class USER_CONFIG {
  /**
   * 用于 Embeddings 的配置
   */
  static EMBEDDINGS = {
    MODEL_NAME: 'text-embedding-v2',
    MODEL_API_KEY: '',
    MODEL_BATCH_SIZE: 1024,
    MODEL_STRIP_NEW_LINES: true,
    MODEL_PARAMETERS: {
      text_type: 'query',
    } as Record<'text_type', 'query' | 'document'>,
  }

  /**
   * 用于 FaissStore 的配置
   */
  static FAISSSTORE_CONFIGURATION = {
    VECTORSTORE_ROOT: 'src/trains/vectorstorage',
    TRAINS_MD_FILES: 'src/trains/MdFiles/*.md',
  }

  /**
   * 用于 OpenAI 的配置
   */
  static OPENAI_CONFIGURATION = {
    MODEL: 'gpt-3.5-turbo-instruct',
    MODEL_NAME: 'text-davinci-003',
    MODEL_API_KEY: 'YOUR_API_KEY',
    MODEL_TEMPERATURE: 0.5,
    MODEL_MAX_TOKENS: 1000,
    MODEL_CONFIGURATION: {
      baseURL: 'YOUR_API_BASEURL',
    },
  }
}
