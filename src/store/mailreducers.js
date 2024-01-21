import { createSlice, configureStore } from '@reduxjs/toolkit'

const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        mails:[],
        unreadTotal:0
    },
    reducers:{
        addMail:(state , action)=>{
            state.mails = [...action.payload]
            state.unreadTotal = action.payload.reduce((sum,ele)=>{
                return sum + (ele.unread? 1 : 0)
            },0)
        }
    }
})

export const mailactions  = mailSlice.actions

const store = configureStore({
    reducer: mailSlice.reducer
})

export default store
