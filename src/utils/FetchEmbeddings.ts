import fetch from 'node-fetch'

export async function fetchEmbeddings(files: string[]): Promise<any | void> {
  const apiKey = 'sk-b3c9367da1b5439ea3dafcd2048e38b7'
  const url = 'https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding'

  const data = {
    model: 'text-embedding-v1',
    input: {
      texts: files,
    },
    parameters: {
      text_type: 'query',
    },
  }
  // console.info('Data:', data)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // console.log('Response:', response)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // const responseData = await response.json()

    // console.log('Response data:', responseData)
    return response
  }
  catch (error) {
    console.error('Error fetching embeddings:', error)
  }
}
