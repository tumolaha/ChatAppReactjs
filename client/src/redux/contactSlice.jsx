import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        currentContact: {
            currentChat: null,
            typeChat: null,
        },
    },
    reducers: {
        setCurrentContact: (state,action) => {
            state.currentContact.currentChat = action.payload.currentChat;
            state.currentContact.typeChat =  action.payload.typeChat;
        },
    },
});

export const { setCurrentContact } = contactSlice.actions;

export default contactSlice.reducer;
