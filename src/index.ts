import { generateResponse } from './utils/GenerateResponse.js'

// 用户输入
// const prompt = psp(undefined)
// 对话历史
const conversationiHistory = ['']

// while () {
const question = 'Human: 总结一下签到小程序具体内容'
let answer = ''
try {
  answer = await generateResponse({
    prompt: question,
    history: conversationiHistory,
  })
}
catch (e) {
  console.error(e)
}

// 检查 answer 是否为对象，如果是则转换为字符串
const answerOutput = typeof answer === 'object' ? JSON.stringify(answer) : answer

// eslint-disable-next-line no-console
console.log(`Answer: ${answerOutput}`)

conversationiHistory.push(`Human: ${question}`, `Rag_Answer: ${answerOutput}`)
// }
