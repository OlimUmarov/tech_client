import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InititialProps {
    isLogin: boolean
}

const initialState: InititialProps = {
    isLogin: false
}

const contentSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        changeLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        }
    }
})


export default contentSlice.reducer
export const { changeLogin } = contentSlice.actions