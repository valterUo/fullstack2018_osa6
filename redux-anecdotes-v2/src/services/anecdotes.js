import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const newcontent = asObject(content)
  const response = await axios.post(url, newcontent)
  return response.data
}

const updateVote = async (oldcontent) => {
  const newcontent = {content: oldcontent.content, id: oldcontent.id, votes: oldcontent.votes + 1}
  const response = await axios.put(url + '/' + oldcontent.id, newcontent)
  return response.data
}

export default { getAll, createNew, updateVote }