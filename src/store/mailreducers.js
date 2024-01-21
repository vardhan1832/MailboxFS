import { createSlice, configureStore } from '@reduxjs/toolkit'

const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        mails:[],
        sentMails:[],
        unreadTotal:0,
        isLoggedIn:localStorage.getItem('token')?true:false
    },
    reducers:{
        addMail:(state , action)=>{
            state.mails = [...action.payload]
            state.unreadTotal = action.payload.reduce((sum,ele)=>{
                return sum + (ele.unread? 1 : 0)
            },0)
        },
        addSentMail:(state,action)=>{
            state.sentMails = [...action.payload]
        },
        logout:(state)=>{
            state.isLoggedIn = false
        },
        login:(state)=>{
            state.isLoggedIn = true
        }
    }
})

export const mailactions  = mailSlice.actions

const store = configureStore({
    reducer: mailSlice.reducer
})

export default store
