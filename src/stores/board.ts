import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

export interface Card {
  id: string
  title: string
  description?: string
  labels?: string[]
}

export interface List {
  id: string
  title: string
  cards: Card[]
}

export interface Board {
  id: string
  title: string
  lists: List[]
}

export const useBoardStore = defineStore('board', {
  state: () => ({
    board: useStorage<Board>('trello-board-data', {
      id: 'board-1',
      title: 'My Development Board',
      lists: [
        {
          id: 'list-1',
          title: '待办事项',
          cards: [
            { id: 'card-1', title: 'Learn Vue 3' },
            { id: 'card-2', title: 'Master Pinia' }
          ]
        },
        {
          id: 'list-2',
          title: '进行中',
          cards: [
            { id: 'card-3', title: 'Build Trello App' }
          ]
        },
        {
          id: 'list-3',
          title: '已完成',
          cards: []
        }
      ]
    })
  }),
  actions: {
    addList(title: string) {
      this.board.lists.push({
        id: uuidv4(),
        title,
        cards: []
      })
    },
    addCard(listId: string, title: string) {
      const list = this.board.lists.find(l => l.id === listId)
      if (list) {
        list.cards.push({
          id: uuidv4(),
          title,
          description: '',
          labels: []
        })
      }
    },
    updateListOrder(newLists: List[]) {
        this.board.lists = newLists
    },
    updateCardOrder(listId: string, newCards: Card[]) {
        const list = this.board.lists.find(l => l.id === listId)
        if (list) {
            list.cards = newCards
        }
    }
  }
})
